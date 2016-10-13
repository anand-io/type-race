import { combineReducers } from 'redux';
import participants from './participants';
import paragraph from './paragraph';

export const everyoneReady = (state = false, action) => {
  switch (action.type) {
    case 'EVERYONE_READY':
      return true;
    case 'GAME_ENDED':
      return false;
    default:
      return state
  }
}

export const gameStarted = (state = false, action) => {
  switch (action.type) {
    case 'GAME_STARTED':
      return true;
    case 'GAME_ENDED':
      return false;
    default:
      return state
  }
}

export const lastGameWMP = (state = 0, action) => {
  switch (action.type) {
    case 'NEW_WPM':
      return action.wpm;
    default:
      return state
  }
}

export const iamReady = (state = false, action) => {
  switch (action.type) {
    case 'IAM_READY':
      return true;
    case 'GAME_ENDED':
      return false;
    default:
      return state
  }
}

export const raceStarted = (state = false, action) => {
  switch (action.type) {
    case 'RACE_STARTED':
      return true;
    case 'GAME_ENDED':
      return false;
    default:
      return state
  }
}

export const timerSeconds = (state = 5, action) => {
  switch (action.type) {
    case 'SET_TIME':
      return action.time;
    default:
      return state
  }
}

export const typingWordIndex = (state = 0, action) => {
  switch (action.type) {
    case 'NEXT_WORD':
      return state + 1;
    default:
      return state
  }
}

export const wrongWord = (state = false, action) => {
  switch (action.type) {
    case 'WRONG_WORD':
      return true;
    case 'CORRECT_WORD':
      return false;
    default:
      return state
  }
}

const typeRacerApp = combineReducers({
  participants, paragraph, raceStarted,
  timerSeconds, typingWordIndex, everyoneReady,
  gameStarted, lastGameWMP, iamReady, wrongWord
});

export default typeRacerApp;
