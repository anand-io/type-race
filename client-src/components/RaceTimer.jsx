import React from 'react'
import { connect } from 'react-redux'

let RaceTimer = ({ show, seconds }) => (
  <div
    style={{ display: show ? 'block' : 'none' }}
  >
    {`00:${seconds}`}
  </div>
)

const mapStateToProps = (state) => ({
  show: state.raceStarted && !state.finishRace,
  seconds: state.gameTimerSeconds,
})

RaceTimer = connect(
  mapStateToProps,
)(RaceTimer);

export default RaceTimer;
