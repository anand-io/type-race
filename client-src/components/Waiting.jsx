import React from 'react';
import { connect } from 'react-redux';

let Waiting = ({ dispatch, show }) => (
  <div className='waiting-overlay'>
    <p
      style={{ display: show ? 'block' : 'none' }}
    >
    Waiting for others to join.
    </p>
  </div>
);

const mapStateToProps = (state) => ({
  show: (!state.startTimerOn && state.joinedRace && !state.raceStarted && !state.raceAlreadyStarted),
})

Waiting = connect(mapStateToProps)(Waiting);

export default Waiting;
