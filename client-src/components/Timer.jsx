import React from 'react'
import { connect } from 'react-redux'

let Timer = ({ show, seconds }) => (
  <div
    style={{ display: show ? 'block' : 'none' }}
  >
    {`00:0${seconds}`}
  </div>
)

const mapStateToProps = (state) => ({
  show: state.everyoneReady && !state.raceStarted,
  seconds: state.timerSeconds,
})

Timer = connect(
  mapStateToProps,
)(Timer);

export default Timer;
