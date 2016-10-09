import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import App from './components/App.jsx'
import reducer from './reducers'
import wss from './services/WebSocketService';
import { addParticipant, participantReady, everyoneReady } from './actions';

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

const onEveryoneReady = participant => store.dispatch(everyoneReady());

wss.init(onParticpantJoined, onParticipantReady, onEveryoneReady);
