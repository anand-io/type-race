import React from 'react'
import { connect } from 'react-redux'

let RaceTimer = ({ show, seconds }) => {
  function pad(val) {
    return val > 9 ? val : `0${val}`;
  }
  const min = parseInt(seconds / 60, 10) % 60;
  return (
    <span
      style={{ display: !show ? 'block' : 'none' }}
    >
      {`${pad(min)}:${pad(seconds % 60)}`}
    </span>
  );
}

const mapStateToProps = (state) => ({
  seconds: state.gameTimerSeconds,
  show: state.showRaceResult,
})

RaceTimer = connect(
  mapStateToProps,
)(RaceTimer);

export default RaceTimer;
