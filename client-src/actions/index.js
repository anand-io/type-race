import wss from '../services/WebSocketService';

let nextTodoId = 0
export const joinRoom = room => dispatch => {
  wss.joinRoom(room, (paragraph, participants) => {
    dispatch(gameStarted(paragraph));
    participants.forEach(p => {
      dispatch(addParticipant(p));
    });
  });
}

export const getReady = room => dispatch => {
  wss.sendReadySignal(room);
  dispatch(iamReady());
}

export const increaseWordCount = noOfCharacters => dispatch => {
  wss.calculateCharacterCount(noOfCharacters);
  dispatch(nextWord());
}

export const finishedTheRace = noOfCharacters => dispatch => {
  wss.calculateCharacterCount(noOfCharacters);
  dispatch(gameEnded());
}

export const gameStarted = paragraph => ({
  type: 'GAME_STARTED',
  paragraph
})

export const gameEnded = paragraph => ({
  type: 'GAME_ENDED',
  paragraph
})

export const addParticipant = id => ({
  type: 'ADD_PARTICIPANT',
  id
})

export const iamReady = id => ({
  type: 'IAM_READY',
  id,
})

export const participantReady = id => ({
  type: 'PARTICIPANT_READY',
  id,
})

export const everyoneReady = id => ({
  type: 'EVERYONE_READY',
  id,
})

export const setTimer = time => ({
  type: 'SET_TIME',
  time,
})

export const raceStarted = () => ({
  type: 'RACE_STARTED',
})

export const correctWord = () => ({
  type: 'CORRECT_WORD',
});

export const wrongWord = () => ({
  type: 'WRONG_WORD',
});

export const nextWord = () => ({
  type: 'NEXT_WORD',
});

export const participantWPM = ({id, wpm, noOfCharacters}) => ({
  type: 'PARTICIPANT_WPM',
  id,
  wpm, noOfCharacters,
});
