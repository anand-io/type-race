import wss from '../services/WebSocketService';

let nextTodoId = 0
export const joinRace = (room, isPractice) => dispatch => {
  dispatch(joinedRace());
  dispatch(setIsPractice(isPractice));
  wss.joinRace(room, isPractice, (paragraph, participants) => {
    if (!paragraph && !participants) {
      dispatch(raceOver());
      dispatch(raceAlreadyStarted(true));
      setTimeout(() =>   dispatch(raceAlreadyStarted(false)), 2000);
      return;
    }
    dispatch(raceData(paragraph));
    participants.forEach(p => {
      dispatch(addParticipant(p));
    });
  });
}

export const challenge = (room, isPractice, to, streamId) => dispatch => {
  dispatch(joinedRace());
  wss.joinRace(room, isPractice, (paragraph, participants) => {
    if (!paragraph && !participants) {
      dispatch(raceOver());
      dispatch(raceAlreadyStarted(true));
      setTimeout(() =>   dispatch(raceAlreadyStarted(false)), 2000);
      return;
    }
    dispatch(raceData(paragraph));
    participants.forEach(p => {
      dispatch(addParticipant(p));
    });
  });
  wss.challenge(to, streamId, decline => {
    wss.leaveRace();
    dispatch(raceOver());
    dispatch(setChallengeRejected(true));
    setTimeout(() => dispatch(setChallengeRejected(false)), 2000);
  });
}

export const finishRace = (noOfCharactersTyped, disqualified) => dispatch => {
  wss.updateWMP(noOfCharactersTyped, true, disqualified, false);
  dispatch(finishedRace(noOfCharactersTyped));
  dispatch(showRaceResult());
}

export const leaveRace = () => dispatch => {
  wss.leaveRace();
  dispatch(raceOver());
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
  wss.connect(user.id, `${user.firstName} ${user.lastName}`, user.photoId);
  dispatch(storeAWUser(user));
};

export const contextChanged = (context) => dispatch => {
  dispatch(setContextInstalled(true));
  dispatch(storeAWContext(context));
  dispatch(hideRaceResult());
  if (!context.members) {
    wss.isInstalled(context.id, (isInstalled) => {
      dispatch(setContextInstalled(isInstalled));
    })
  }
};

export const inviteBychat = (user, context) => dispatch => {
  const accountId = user.accountId;
  const userId = !context.members ? context.id : null;
  const streamId = context.members ? context.id : null;
  wss.inviteBychat(accountId, userId, streamId);
};

export const activeChallenge = (challengeData, callback) => ({
  type: 'ACTIVE_CHALLENGE',
  challengeData,
  callback,
});

export const clearChallenge = value => ({
  type: 'CHALLENGE_CLEAR',
});

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
  imageUrl: participant.imageUrl,
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

export const raceAlreadyStarted = value => ({
  type: 'SET_RACE_ALREADY_STARTED',
  value,
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

export const setChallengeRejected = value => ({
  type: 'SET_CHALLENGE_REJECTED',
  value
});

export const setNeedAuthorization = value => ({
  type: 'SET_NEED_AUTHORIZATION',
  value
});

export const setContextInstalled = value => ({
  type: 'SET_CONTEXT_INSTALLED',
  value
});
