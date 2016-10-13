import { combineReducers } from 'redux';
import participants from './participants';
import paragraph from './paragraph';

export const joinedRace = (state = false, action) => {
  switch (action.type) {
    case 'JOINED_RACE':
      return true;
    case 'RACE_OVER':
      return false;
    default:
      return state
  }
}

export const myInfo = (state = null, action) => {
  switch (action.type) {
    case 'MY_INFO':
      return action.myInfo;
    default:
      return state
  }
}

export const startTimerOn = (state = false, action) => {
  switch (action.type) {
    case 'START_TIMER':
      return true;
    case 'RACE_STARTED':
      return false;
    default:
      return state
  }
}

export const raceStarted = (state = false, action) => {
  switch (action.type) {
    case 'RACE_STARTED':
      return true;
    case 'RACE_OVER':
      return false;
    default:
      return state
  }
}

export const finishedRace = (state = false, action) => {
  switch (action.type) {
    case 'FINISHED_RACE':
      return true;
    case 'RACE_OVER':
      return false;
    default:
      return state
  }
}

export const raceResult = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_RACE_RESULT':
      return {
        position: action.position,
        participant: action.participant,
      }
    default:
      return state
  }
}

export const raceResults = (state = [], action) => {
  switch (action.type) {
    case 'ADD_RACE_RESULT':
      return [
        ...state,
        raceResult(undefined, action),
      ]
    default:
      return state
  }
}

export const showRaceResult = (state = false, action) => {
  switch (action.type) {
    case 'SHOW_RACE_RESULT':
      return true;
    case 'JOINED_RACE':
      return false;
    default:
      return state
  }
}

export const startTimerSeconds = (state = 5, action) => {
  switch (action.type) {
    case 'SET_START_TIMER':
      return action.time;
    case 'RACE_OVER':
      return 5;
    default:
      return state
  }
}

export const gameTimerSeconds = (state = 120, action) => {
  switch (action.type) {
    case 'SET_GAME_TIMER':
      return action.time;
    case 'RACE_OVER':
      return 120;
    default:
      return state
  }
}

export const noOfCharactersTyped = (state = 0, action) => {
  switch (action.type) {
    case 'NEXT_WORD':
      return action.noOfCharactersTyped;
    case 'FINISHED_RACE':
      return action.noOfCharactersTyped;
    case 'RACE_OVER':
      return 0;
    default:
      return state
  }
}

export const typingWordIndex = (state = 0, action) => {
  switch (action.type) {
    case 'NEXT_WORD':
      return state + 1;
    case 'RACE_OVER':
      return 0;
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

export const raceAlreadyStarted = (state = false, action) => {
  switch (action.type) {
    case 'RACE_ALREADY_STARTED':
      return true;
    case 'RACE_OVER':
      return false;
    default:
      return state
  }
}

const typeRacerApp = combineReducers({
  participants, wrongWord, gameTimerSeconds, myInfo,
  paragraph, raceStarted, finishedRace, startTimerOn, raceAlreadyStarted,
  joinedRace, startTimerSeconds, typingWordIndex, noOfCharactersTyped,
  raceResults, showRaceResult,
});

export default typeRacerApp;
