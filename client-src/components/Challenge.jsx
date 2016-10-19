import React from 'react';
import { connect } from 'react-redux';
import Paragraph from './Paragraph.jsx';
import TypingArea from './TypingArea.jsx';
import Participants from './Participants.jsx';
import RaceTimer from './RaceTimer.jsx';
import RaceResult from './RaceResult.jsx';
import StartTimer from './StartTimer.jsx';

import { finishRace, leaveRace } from '../actions';

let Challenge = (props) => {
  const { dispatch, show, noOfCharactersTyped, showRaceResult, finishedRace, startTimerOn,
  raceStarted } = props;
  return (
    <section
      className="challenge-page completed-page"
      style={{ display: show ? 'block' : 'none' }}
    >
      <div className="challenge-head">
        <i
          className="arrow-left"
          style={{ display: !showRaceResult ? 'block' : 'none' }}
          onClick={() => {
            if(startTimerOn || raceStarted) {
              dispatch(finishRace(noOfCharactersTyped, true));
              document.getElementsByTagName('input')[0].value = '';
            } else {
              dispatch(leaveRace());
            }

          }}
        />
        <h5>{showRaceResult ? 'Completed' : 'Challenge'}</h5>
        <RaceTimer />
      </div>
      <Participants />
      <Paragraph />
      <TypingArea />
      <RaceResult />
      <StartTimer />
    </section>
  );
}

const mapStateToProps = (state) => ({
  show: (state.joinedRace || state.showRaceResult),
  showRaceResult: state.showRaceResult,
  isPractice: state.isPractice,
  noOfCharactersTyped: state.noOfCharactersTyped,
  finishedRace: state.finishedRace,
  startTimerOn: state.startTimerOn,
  raceStarted: state.raceStarted,
});

Challenge = connect(mapStateToProps)(Challenge);

export default Challenge;
