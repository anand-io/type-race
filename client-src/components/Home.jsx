import React from 'react';
import { connect } from 'react-redux';
import { joinRace, leaderBoard, challenge } from '../actions';

let Home = ({ dispatch, show, myId, awContext, isAW }) => {
  let raceToJoin = location.pathname.replace('/', '');
  let challengeAction = joinRace;
  if (isAW) {
    if (myId > awContext.id) raceToJoin = myId + awContext.id;
    else raceToJoin = awContext.id + myId;
    challengeAction = challenge;
  }
  return (
    <section
      style={{ display: show ? 'block' : 'none' }}
      className="home-page"
    >
      <button
        className="warmup"
        onClick={() => dispatch(joinRace(myId, true))}
      >Warm Up</button>
      <hr/>
      <span>OR</span>
      <button
        className="challenge"
        onClick={() => dispatch(challengeAction(raceToJoin, false, myId, awContext.id))}
      >
        {`Challenge ${awContext && awContext.firstName ? awContext.firstName : ''}`}
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
  awContext: state.awContext,
  isAW: state.isAW,
});

Home = connect(mapStateToProps)(Home);

export default Home;
