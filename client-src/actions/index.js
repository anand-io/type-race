import wss from '../services/WebSocketService';

let nextTodoId = 0
export const joinRace = room => dispatch => {
  dispatch(joinedRace());
  wss.joinRace(room, (paragraph, participants) => {
    if (!paragraph && !participants) {
      dispatch(raceAlreadyStarted(paragraph));
      setTimeout(() => leftRace(), 2000);
      return;
    }
    dispatch(raceData(paragraph));
    participants.forEach(p => {
      dispatch(addParticipant(p));
    });
  });
}

export const finishRace = noOfCharactersTyped => dispatch => {
  // wss.finishedRace();
  wss.updateWMP(noOfCharactersTyped, true);
  dispatch(finishedRace(noOfCharactersTyped));
}

export const joinedRace = () => ({
  type: 'JOINED_RACE'
});

export const leftRace = () => ({
  type: 'LEFT_RACE'
});

export const raceData = paragraph => ({
  type: 'RACE_DATA',
  paragraph
});

export const addParticipant = id => ({
  type: 'ADD_PARTICIPANT',
  id
});

export const startTimer = id => ({
  type: 'START_TIMER',
});

export const setTimer = time => ({
  type: 'SET_TIME',
  time,
});

export const raceStarted = () => ({
  type: 'RACE_STARTED',
});

export const finishedRace = noOfCharactersTyped => ({
  type: 'FINISHED_RACE',
  noOfCharactersTyped,
});

export const raceOver = () => ({
  type: 'RACE_OVER',
});

export const lastRaceData = () => ({
  type: 'LAST_RACE_DATA',
});

export const correctWord = () => ({
  type: 'CORRECT_WORD',
});

export const wrongWord = () => ({
  type: 'WRONG_WORD',
});

export const nextWord = noOfCharactersTyped => ({
  type: 'NEXT_WORD',
  noOfCharactersTyped,
});

export const participantWPM = ({id, wpm, noOfCharacters, place, isFinished}) => ({
  type: 'PARTICIPANT_WPM',
  id,
  wpm, noOfCharacters,
  place,
  isFinished,
});

export const raceAlreadyStarted = time => ({
  type: 'RACE_ALREADY_STARTED',
});
