import React from 'react';
import { connect } from 'react-redux';
import { joinRace, leaderBoard } from '../actions';

let Home = ({ dispatch, show, myId, awContext }) => (
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
      onClick={() => dispatch(joinRace(location.pathname.replace('/', '')))}
    >
      {`Challenge ${awContext && awContext.firstName ? awContext.firstName : ''}`}
    </button>
    <a
      className="stage-btn"
      onClick={() => dispatch(leaderBoard())}
    />
  </section>
);

const mapStateToProps = (state) => ({
  show: (!state.joinedRace && !state.showRaceResult && !state.showLeaderBoard),
  isPractice: state.isPractice,
  myId: state.myInfo.id || state.awUser.id,
  awContext: state.awContext,
});

Home = connect(mapStateToProps)(Home);

export default Home;
