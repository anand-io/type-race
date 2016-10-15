import React from 'react';
import { connect } from 'react-redux';
import { joinRace } from '../actions';

let Home = ({ dispatch, show }) => (
  <section
    style={{ display: show ? 'block' : 'none' }}
    className="home-page"
  >
    <button className="warmup">Warm Up</button>
    <hr/>
    <span>OR</span>
    <button
      className="challenge"
      onClick={() => dispatch(joinRace(location.pathname.replace('/', '')))}
    >
      Challenge
    </button>
    <a href="" className="stage-btn"><img src="/images/stage-btn.png" alt="stage-btn"/></a>
  </section>
);

const mapStateToProps = (state) => ({
  show: !state.joinedRace,
  showRaceResult: state.showRaceResult,
  isPractice: state.isPractice,
});

Home = connect(mapStateToProps)(Home);

export default Home;
