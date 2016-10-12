import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import App from './components/App.jsx'
import reducer from './reducers'
import wss from './services/WebSocketService';
import { addParticipant, setTimer, raceStarted, startTimer,
  participantWPM } from './actions';

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

const onParticipantReady = participant => store.dispatch(participantReady(participant));

const onStartCounter = () => {
  store.dispatch(startTimer());
  const timeInterval = setInterval(() => {
    let seconds = store.getState().timerSeconds;
    if (!seconds) {
      store.dispatch(raceStarted());
      clearInterval(timeInterval);
      document.getElementsByTagName('textarea')[0].focus();
      sendCharaterInInterval();
      return;
    }
    store.dispatch(setTimer(--seconds));
  }, 1000);
};

const onParticipantCount = participant => store.dispatch(participantWPM(participant));

wss.init(onParticpantJoined, onParticipantReady, onStartCounter, onParticipantCount);
