import React from 'react';
import { connect } from 'react-redux';
import { joinRace } from '../actions';

let Start = ({ dispatch, show, showRaceResult }) => (
  <a
    style={{ display: show ? 'block' : 'none' }}
    onClick={() => {
      dispatch(joinRace(location.pathname.replace('/', '')));
    }}
  >{showRaceResult ? "Race Again" : "Join Race"}</a>
);

const mapStateToProps = (state) => ({
  show: !state.joinedRace,
  showRaceResult: state.showRaceResult
})

Start = connect(mapStateToProps)(Start);

export default Start;
