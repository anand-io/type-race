import React from 'react'
import { connect } from 'react-redux'

let RaceTimer = ({ show, seconds }) => {
  function pad(val) {
    return val > 9 ? val : `0${val}`;
  }
  const min = parseInt(seconds / 60, 10) % 60;
  return (
    <span>
      {`${pad(min)}:${pad(seconds % 60)}`}
    </span>
  );
}

const mapStateToProps = (state) => ({
  show: state.joinedRace && !state.finishRace && !state.showRaceResult,
  seconds: state.gameTimerSeconds,
})

RaceTimer = connect(
  mapStateToProps,
)(RaceTimer);

export default RaceTimer;
