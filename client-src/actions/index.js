import wss from '../services/WebSocketService';

let nextTodoId = 0
export const joinRace = room => dispatch => {
  dispatch(joinedRace());
  wss.joinRace(room, (paragraph, participants) => {
    if (!paragraph && !participants) {
      dispatch(raceAlreadyStarted(paragraph));
      setTimeout(() => raceOver(), 2000);
      return;
    }
    dispatch(raceData(paragraph));
    participants.forEach(p => {
      dispatch(addParticipant(p));
    });
  });
}

export const finishRace = (noOfCharactersTyped, disqualified) => dispatch => {
  wss.updateWMP(noOfCharactersTyped, true, disqualified);
  dispatch(finishedRace(noOfCharactersTyped));
  dispatch(showRaceResult());
}

export const participantUpdate = participant => dispatch => {
  dispatch(participantWPM(participant));
  if (participant.isFinished) {
    dispatch(addRaceResult({ participant }));
  }
}

export const setMyInfo = myInfo => ({
  type: 'MY_INFO',
  myInfo,
});

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

export const setStartTimer = time => ({
  type: 'SET_START_TIMER',
  time,
});

export const setGameTimer = time => ({
  type: 'SET_GAME_TIMER',
  time,
});

export const raceStarted = () => ({
  type: 'RACE_STARTED',
});

export const finishedRace = noOfCharactersTyped => ({
  type: 'FINISHED_RACE',
  noOfCharactersTyped,
});

export const addRaceResult = result => ({
  type: 'ADD_RACE_RESULT',
  position: result.participant.position,
  participant: result.participant,
});

export const raceOver = () => ({
  type: 'RACE_OVER',
});

export const showRaceResult = () => ({
  type: 'SHOW_RACE_RESULT',
});

export const hideRaceResult = () => ({
  type: 'HIDE_RACE_RESULT',
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
