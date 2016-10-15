import React from 'react'
import { connect } from 'react-redux'

let Participants = ({ participants, paragraph, finishedRace, myId,  isPractice}) => {
  const rParticipants = [...participants];
  if (rParticipants.length === 1 && !isPractice) {
    rParticipants.push({ waiting: true, id: 'Waiting for others to join...'});
  }
  return (
    <ul className="challenge-user">
      {rParticipants.map(participant => {
        let percentageCompleted = (participant.noOfCharacters / paragraph.raw.length) * 100;
        const participantId = participant.id === myId ?
        'You' : participant.id.split('-')[0];
        let WPM = `: ${Math.ceil(participant.wpm)} WPM`;
        if (participant.waiting) {
          WPM = '';
          percentageCompleted = 0;
        }
        return (
          <li
            style={{ display: finishedRace && participant.isFinished ? 'none' : 'block' }}
            className="skill"
            key={participant.id}
          >
            <div
              className="overlay"
              style={{ width: `${percentageCompleted}%`}}
            />
          <span>{`${participantId}${WPM}`}</span>
          </li>
        );
      })}
    </ul>
  );
}

const mapStateToProps = (state) => ({
  participants: state.participants,
  paragraph: state.paragraph,
  finishedRace: state.finishedRace,
  myId: state.myInfo.id,
  isPractice: state.isPractice,
})

Participants = connect(
  mapStateToProps,
)(Participants)

export default Participants;
