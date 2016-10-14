import React from 'react'
import { connect } from 'react-redux'

let RaceResults = ({ raceResults, show, myId }) => (
  <ul style={{ display: show ? 'block' : 'none' }}>
    {raceResults.map(result => {
      const participant = result.participant.id === myId ?
      'You' : result.participant.id.split('-')[0];
      return (
        <li key={result.participant.id}>
          {`${result.position ? `${result.position} place` : 'Disqualified'}  -
          ${participant} -
          ${Math.ceil(result.participant.wpm)} WMP`}
        </li>
      );
    })}
  </ul>
);

const mapStateToProps = (state) => ({
  raceResults: state.raceResults,
  show: state.showRaceResult,
  myId: state.myInfo.id,
});

RaceResults = connect(
  mapStateToProps,
)(RaceResults);

export default RaceResults;
