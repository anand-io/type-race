import wss from '../services/WebSocketService';

let nextTodoId = 0
export const joinRace = (room, isPractice) => dispatch => {
  dispatch(joinedRace());
  dispatch(setIsPractice(isPractice));
  wss.joinRace(room, isPractice, (paragraph, participants) => {
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

export const leaderBoard = participant => dispatch => {
  wss.getLeaders(leaders => {
    dispatch(storeLeaders(leaders));
    dispatch(showLeaderBoard());
  });
};

export const registered = user => dispatch => {
  wss.connect(user.id, `${user.firstName} ${user.lastName}`);
  dispatch(storeAWUser(user));
};

export const setAW = value => ({
  type: 'IS_AW',
  value
});

export const setMyInfo = myInfo => ({
  type: 'MY_INFO',
  myInfo,
});

export const joinedRace = () => ({
  type: 'JOINED_RACE'
});

export const setIsPractice = isPractice => ({
  type: 'SET_IS_PRACTICE',
  isPractice,
});

export const leftRace = () => ({
  type: 'LEFT_RACE'
});

export const raceData = paragraph => ({
  type: 'RACE_DATA',
  paragraph
});

export const addParticipant = participant => ({
  type: 'ADD_PARTICIPANT',
  id: participant.id,
  name: participant.name,
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

export const storeAWUser = user => ({
  type: 'AW_USER',
  user,
});

export const storeAWContext = context => ({
  type: 'AW_CONTEXT',
  context,
});

export const appActivated = (user, context) => ({
  type: 'APP_ACTIVATED',
  user,
  context,
});

export const appDeactivated = (user, context) => ({
  type: 'APP_DEACTIVATED',
  user,
  context,
});

export const showLeaderBoard = leaders => ({
  type: 'SHOW_LEADER_BOARD',
  leaders,
});

export const hideLeaderBoard = leaders => ({
  type: 'HIDE_LEADER_BOARD',
  leaders,
});

export const storeLeaders = leaders => ({
  type: 'LEADERS',
  leaders,
});
participantsHeight

export const participantsHeight = height => ({
  type: 'PARTICIPANTS_HEIGHT',
  height,
});
