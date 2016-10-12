import React from 'react';
import { connect } from 'react-redux';

let Ready = ({ dispatch, show }) => (
  <p
    style={{ display: show ? 'block' : 'none' }}
  >Waiting for others to join.</p>
);

const mapStateToProps = (state) => ({
  show: (!state.timerOn && state.joinedRace && !state.raceStarted) ,
})

Ready = connect(mapStateToProps)(Ready);

export default Ready;
