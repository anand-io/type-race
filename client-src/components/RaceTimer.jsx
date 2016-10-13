import React from 'react'
import { connect } from 'react-redux'

let RaceTimer = ({ show, seconds }) => {
  function pad(val) {
    return val > 9 ? val : `0${val}`;
  }
  const min = parseInt(seconds / 60, 10) % 60;
  return (
    <div
      style={{ display: show ? 'block' : 'none' }}
    >
      {`${pad(min)}:${pad(seconds % 60)}`}
    </div>
  );
}

const mapStateToProps = (state) => ({
  show: state.raceStarted && !state.finishRace,
  seconds: state.gameTimerSeconds,
})

RaceTimer = connect(
  mapStateToProps,
)(RaceTimer);

export default RaceTimer;
