import React from 'react'
import { connect } from 'react-redux'

let RaceResults = ({ raceResults, show }) => (
  <ul style={{ display: show ? 'block' : 'none' }}>
    {raceResults.map(result => {
      return (
        <li key={result.position}>
          {`${result.position} place - ${result.participant.id.split('-')[0]}`}
        </li>
      );
    })}
  </ul>
);

const mapStateToProps = (state) => ({
  raceResults: state.raceResults,
  show: state.showRaceResult,
});

RaceResults = connect(
  mapStateToProps,
)(RaceResults);

export default RaceResults;
