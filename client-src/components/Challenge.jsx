import React from 'react';
import { connect } from 'react-redux';
import Paragraph from './Paragraph.jsx';
import TypingArea from './TypingArea.jsx';
import Participants from './Participants.jsx';
import RaceTimer from './RaceTimer.jsx';
import RaceResult from './RaceResult.jsx';

import { finishRace } from '../actions';

let Challenge = (props) => {
  const { dispatch, show, noOfCharactersTyped, showRaceResult } = props;
  return (
    <section
      className="challenge-page completed-page"
      style={{ display: show ? 'block' : 'none' }}
    >
      <div className="challenge-head">
        <i
          className="arrow-left"
          style={{ display: !showRaceResult ? 'block' : 'none' }}
          onClick={() => dispatch(finishRace(noOfCharactersTyped, true))}
        />
        <h5>{showRaceResult ? 'Completed' : 'Challenge'}</h5>
        <RaceTimer />
      </div>
      <Participants />
      <Paragraph />
      <TypingArea />
      <RaceResult />
    </section>
  );
}

const mapStateToProps = (state) => ({
  show: (state.joinedRace || state.showRaceResult),
  showRaceResult: state.showRaceResult,
  isPractice: state.isPractice,
  noOfCharactersTyped: state.noOfCharactersTyped,
});

Challenge = connect(mapStateToProps)(Challenge);

export default Challenge;
