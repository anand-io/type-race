import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import App from './components/App.jsx'
import reducer from './reducers'
import wss from './services/WebSocketService';
import { addParticipant, participantReady, everyoneReady, setTimer, raceStarted } from './actions';

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

const onParticpantJoined = participant => store.dispatch(addParticipant(participant));

const onParticipantReady = participant => store.dispatch(participantReady(participant));

const onEveryoneReady = participant => {
  store.dispatch(everyoneReady());
  const timeInterval = setInterval(() => {
    let seconds = store.getState().timerSeconds;
    if (!seconds) {
      store.dispatch(raceStarted());
      clearInterval(timeInterval);
      document.getElementsByTagName('textarea')[0].focus();
      return;
    }
    store.dispatch(setTimer(--seconds));
  }, 1000);
};

wss.init(onParticpantJoined, onParticipantReady, onEveryoneReady);
