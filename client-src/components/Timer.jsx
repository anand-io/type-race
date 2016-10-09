import React from 'react'
import { connect } from 'react-redux'

let Timer = ({ show }) => (
  <div style={{ display: show ? 'block' : 'none' }}>00:05</div>
)

const mapStateToProps = (state) => ({
  show: state.everyoneReady && !state.raceStarted,
})

Timer = connect(
  mapStateToProps,
)(Timer);

export default Timer;
