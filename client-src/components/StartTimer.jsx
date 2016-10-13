import React from 'react'
import { connect } from 'react-redux'

let StartTimer = ({ show, seconds }) => (
  <div
    style={{ display: show ? 'block' : 'none' }}
  >
    {`00:0${seconds}`}
  </div>
)

const mapStateToProps = (state) => ({
  show: state.startTimerOn,
  seconds: state.startTimerSeconds,
})

StartTimer = connect(
  mapStateToProps,
)(StartTimer);

export default StartTimer;
