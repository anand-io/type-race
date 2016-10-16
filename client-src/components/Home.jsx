import React from 'react';
import { connect } from 'react-redux';
import { joinRace, leaderBoard } from '../actions';

let Home = ({ dispatch, show, myId }) => (
  <section
    style={{ display: show ? 'block' : 'none' }}
    className="home-page"
  >
    <a href="http://localhost:3000/Permissions" target="_blank">Grant Permission</a>
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
      Challenge
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
  myId: state.myInfo.id,
});

Home = connect(mapStateToProps)(Home);

export default Home;
