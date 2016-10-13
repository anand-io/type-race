import React from 'react';
import { connect } from 'react-redux';
import { joinRace } from '../actions';

let Start = ({ dispatch, show, showRaceResult }) => (
  <div
    className='btn btn_primary'
    style={{ display: show ? 'block' : 'none' }}
    onClick={() => {
      dispatch(joinRace(location.pathname.replace('/', '')));
    }}
  >{showRaceResult ? "Race Again" : "Join Race"}</div>
);

const mapStateToProps = (state) => ({
  show: !state.joinedRace,
  showRaceResult: state.showRaceResult
})

Start = connect(mapStateToProps)(Start);

export default Start;
