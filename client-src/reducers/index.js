import { combineReducers } from 'redux';
import participants from './participants';
import paragraph from './paragraph';

export const joinedRace = (state = false, action) => {
  switch (action.type) {
    case 'JOINED_RACE':
      return true;
    case 'LEFT_RACE':
      return false;
    default:
      return state
  }
}

export const timerOn = (state = false, action) => {
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

export const lastRaceData = (state = {}, action) => {
  switch (action.type) {
    case 'LAST_RACE_DATA':
      return {
        wmp: action.wpm,
        place: action.place,
        raceId: action.raceId,
      };
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

export const noOfCharactersTyped = (state = 0, action) => {
  switch (action.type) {
    case 'NEXT_WORD':
      return action.noOfCharactersTyped;
    case 'FINISHED_RACE':
      return action.noOfCharactersTyped;
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

export const raceAlreadyStarted = (state = false, action) => {
  switch (action.type) {
    case 'RACE_ALREADY_STARTED':
      return true;
    case 'LEFT_RACE':
      return false;
    default:
      return state
  }
}

const typeRacerApp = combineReducers({
  participants, lastRaceData,
  paragraph, raceStarted, finishedRace, timerOn, raceAlreadyStarted,
  joinedRace, timerSeconds, typingWordIndex, noOfCharactersTyped,
});

export default typeRacerApp;
