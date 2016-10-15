import React from 'react';
import { connect } from 'react-redux';
import Paragraph from './Paragraph.jsx';
import TypingArea from './TypingArea.jsx';
import Participants from './Participants.jsx';
import RaceTimer from './RaceTimer.jsx';

let Challenge = (props) => {
  const { dispatch, show } = props;
  return (
    <section
      className="challenge-page"
      style={{ display: show ? 'block' : 'none' }}
    >
      <ul className="challenge-head">
        <li><i className="fa fa-angle-left" aria-hidden="true"></i></li>
        <li>Challenge</li>
        <RaceTimer />
      </ul>
      <Participants />
      <Paragraph />
      <TypingArea />
    </section>
  );
}

const mapStateToProps = (state) => ({
  show: state.joinedRace,
  showRaceResult: state.showRaceResult,
  isPractice: state.isPractice,
});

Challenge = connect(mapStateToProps)(Challenge);

export default Challenge;
