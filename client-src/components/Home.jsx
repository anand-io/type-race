import React from 'react';
import { connect } from 'react-redux';
import { joinRace, leaderBoard, challenge, clearChallenge, inviteBychat } from '../actions';

let Home = ({ dispatch, show, myId, awContext, isAW, activeChallenge, challengeRejected,
raceAlreadyStarted, needAuthorization, contextHasInstalledApp, awUser }) => {
  let raceToJoin = location.pathname.replace('/', '');
  let challengeAction = joinRace;
  if (isAW) {
    if (awContext.members) {
      raceToJoin = awContext.id;
    } else {
      if (myId > awContext.id) raceToJoin = myId + awContext.id;
      else raceToJoin = awContext.id + myId;
    }
    challengeAction = challenge;
  }
  const secondButtonStyle = {};
  if (activeChallenge.from) secondButtonStyle['background-color'] = '#DE2626';
  if (needAuthorization) secondButtonStyle.display = 'none';
  return (
    <section
      style={{ display: show ? 'block' : 'none' }}
      className="home-page"
    >
      <div
        className='challenge-from'
        style={{ display: activeChallenge.from ? 'block' : 'none' }}
      >Challenge from {activeChallenge.name}</div>
      <div
        className='challenge-rejected'
        style={{ display: challengeRejected ? 'block' : 'none' }}
      >Challenge Reject</div>
      <div
        className='challenge-rejected'
        style={{ display: raceAlreadyStarted ? 'block' : 'none' }}
      >Race already started. Try again later.</div>
      <button
        className="warmup"

        target="_blank"
        style={{ display: needAuthorization ? 'block' : 'none' }}
        onClick={() => window.open('/Permissions')}
      >
        Authorize
      </button>
      <button
        className="warmup"
        style={{ display: !needAuthorization ? 'block' : 'none' }}
        onClick={() => {
          if (!activeChallenge.from) {
            dispatch(joinRace(myId, true));
          } else {
            let raceToJoin;
            if (activeChallenge.streamId) {
              raceToJoin = activeChallenge.streamId;
            } else {
              if (myId > activeChallenge.from) raceToJoin = myId + activeChallenge.from;
              else raceToJoin = activeChallenge.from + myId;
            }
            dispatch(joinRace(raceToJoin));
            dispatch(clearChallenge());
          }
        }}
      >{activeChallenge.from ? 'Accept' : 'Warm Up'}</button>
      <hr style={{ display: !needAuthorization ? 'block' : 'none' }}/>
      <span style={{ display: !needAuthorization ? 'block' : 'none' }}>OR</span>
      <button
        className="challenge"
        style={secondButtonStyle}
        onClick={() => {
          if (!activeChallenge.from && contextHasInstalledApp) {
            const challengingIds = awContext.members ? awContext.members : awContext.id;
            const streamId = awContext.members ? awContext.id : null;
            dispatch(challengeAction(raceToJoin, false, challengingIds, streamId));
          } else if (!contextHasInstalledApp && awContext) {
            dispatch(inviteBychat(awUser, awContext));
          } else {
            dispatch(clearChallenge());
            if (!activeChallenge.streamId) {
              activeChallenge.callback(true);
            }
          }
        }}
      >
        {
          activeChallenge.from ? 'Reject' :
            `${contextHasInstalledApp ? 'Challenge' : 'Invite'}
            ${awContext && awContext.firstName ? awContext.firstName : '' }`
        }
      </button>
      <a
        className="stage-btn"
        onClick={() => dispatch(leaderBoard())}
      />
    </section>
  );
}

const mapStateToProps = (state) => ({
  show: (!state.joinedRace && !state.showRaceResult && !state.showLeaderBoard),
  isPractice: state.isPractice,
  myId: state.myInfo.id || state.awUser.id,
  awUser: state.awUser,
  awContext: state.awContext,
  isAW: state.isAW,
  activeChallenge: state.activeChallenge,
  challengeRejected: state.challengeRejected,
  raceAlreadyStarted: state.raceAlreadyStarted,
  needAuthorization: state.needAuthorization,
  contextHasInstalledApp: state.contextHasInstalledApp,
});

Home = connect(mapStateToProps)(Home);

export default Home;
