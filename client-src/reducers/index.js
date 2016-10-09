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

const typeRacerApp = combineReducers({
  participants,
  paragraph, raceStarted,
  everyoneReady, gameStarted, lastGameWMP, iamReady,
});

export default typeRacerApp;
