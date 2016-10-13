import React from 'react';
import { connect } from 'react-redux';

let Waiting = ({ dispatch, show }) => (
  <p
    style={{ display: show ? 'block' : 'none' }}
  >Race already started! Try again later.</p>
);

const mapStateToProps = (state) => ({
  show: state.raceAlreadyStarted,
})

Waiting = connect(mapStateToProps)(Waiting);

export default Waiting;
