import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import App from './components/App.jsx'
import reducer from './reducers'
import wss from './services/WebSocketService';
import awServices from './services/AwServices';
import {
  addParticipant, setStartTimer, raceStarted, startTimer, participantUpdate,
  raceOver, setGameTimer, setMyInfo, finishRace, storeAWUser, storeAWContext,
  appActivated, appDeactivated, setAW, activeChallenge, setNeedAuthorization,
} from './actions';

function addPrefixToLogs() {
  const logMethods = ['log', 'info', 'error', 'warn', 'debug'];
  logMethods.forEach(logMethod => {
    const backupMethod = console[logMethod];
    console[logMethod] = (...args) => {
      args.unshift('TypRace:: ');
      backupMethod.apply(console, args);
    };
  });
}

addPrefixToLogs();

const data = document.getElementById('data');
const myId = data.getAttribute('myid');
const isAW = data.getAttribute('isaw') === "true";

// var AwApp = AAFClient.init();
//
// AwApp.on('registered', ({user}) => {
//   console.error(`registered : ${JSON.stringify(data)}`);
// });
//
// AwApp.on('activated', ({user, context}) => {
//   console.error(`activated : ${JSON.stringify(data)}`);
// })
//
// AwApp.on('context-change', ({user, context}) => {
//   console.error(`context-change : ${JSON.stringify(data)}`);
// });
//
// AwApp.on('deactivated', data => {
//   console.error(`deactivated : ${JSON.stringify(data)}`);
// });

const middleware = [ thunk ]

const store = createStore(
  reducer,
  applyMiddleware(...middleware),
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

store.dispatch(setMyInfo({ id: myId }));

store.dispatch(setAW(isAW));

const sendCharaterInInterval = () => {
  setTimeout(() => {
    const state = store.getState();
    if (state.joinedRace && !state.finishedRace){
      wss.updateWMP(state.noOfCharactersTyped, false, false, false);
      sendCharaterInInterval();
    }
  }, 1000);
}

const onParticpantJoined = participant => store.dispatch(addParticipant(participant));

let startTimerInterval = null;


const onStartCounter = () => {
  if (store.getState().startTimerOn) {
    clearInterval(startTimerInterval);
    store.dispatch(setStartTimer(6));
  }
  store.dispatch(startTimer());
  startTimerInterval = setInterval(() => {
    if (!store.getState().startTimerOn) {
      clearInterval(startTimerInterval);
      return;
    }
    let seconds = store.getState().startTimerSeconds;
    if (!--seconds) {
      store.dispatch(raceStarted());
      clearInterval(startTimerInterval);
      document.getElementsByTagName('input')[0].focus();
      startRaceTimer();
      wss.raceStarted();
      sendCharaterInInterval();
      return;
    }
    store.dispatch(setStartTimer(seconds));
  }, 1000);
};

const startRaceTimer = () => {
  const timeInterval = setInterval(() => {
    if (!store.getState().joinedRace) {
      // store.dispatch(setGameTimer(120));
      clearInterval(timeInterval);
      return;
    }
    let seconds = store.getState().gameTimerSeconds;
    store.dispatch(setGameTimer(--seconds));
    if (seconds === 0) {
      clearInterval(timeInterval);
      store.dispatch(finishRace(store.getState().noOfCharactersTyped, true));
    }
  }, 1000);
};

const onRaceOver = () => store.dispatch(raceOver());

const onParticipantUpdate = participant => store.dispatch(participantUpdate(participant));

const onChallenge = (challengeData, callback) => {
  if (challengeData.from === store.getState().awUser.id) return;
  const challengeStream = challengeData.streamId || challengeData.from;
  awServices.showIndicator(challengeStream);
  awServices.showNotification(challengeStream, challengeData.name);
  store.dispatch(activeChallenge(challengeData, callback));
}

const onNeedAuthorization = () => store.dispatch(setNeedAuthorization(true));

const onGotAuthorization = () => store.dispatch(setNeedAuthorization(false));

wss.init(isAW, onParticpantJoined, onStartCounter, onParticipantUpdate, onRaceOver, onChallenge,
onNeedAuthorization, onGotAuthorization);

awServices.init(store);

window.store = store;
