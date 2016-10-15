import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import App from './components/App.jsx'
import reducer from './reducers'
import wss from './services/WebSocketService';
import { addParticipant, setStartTimer, raceStarted, startTimer,
  participantUpdate, raceOver, setGameTimer, setMyInfo, finishRace} from './actions';

const data = document.getElementById('data');
const myId = data.getAttribute('myid');

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

const sendCharaterInInterval = () => {
  setTimeout(() => {
    const state = store.getState();
    if (state.joinedRace && !state.finishedRace){
      wss.updateWMP(state.noOfCharactersTyped);
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

wss.init(onParticpantJoined, onStartCounter, onParticipantUpdate, onRaceOver);
