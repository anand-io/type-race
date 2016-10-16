import React from 'react'
import { connect } from 'react-redux'

let StartTimer = ({ show, seconds }) => (
  <div
    className='cd-number-wrapper'
    style={{ display: show ? 'block' : 'none' }}
  >
    <span className="cd-number-six">{seconds}</span>
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
