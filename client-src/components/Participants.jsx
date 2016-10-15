import React from 'react'
import { connect } from 'react-redux'

let Participants = ({ participants, paragraph, finishedRace, myId,  isPractice, show}) => {
  const rParticipants = [...participants];
  if (rParticipants.length === 1 && !isPractice) {
    rParticipants.push({ waiting: true, id: 'Waiting for others to join...'});
  }
  return (
    <ul className="challenge-user" style={{ display: show ? 'block' : 'none' }}>
      {rParticipants.map(participant => {
        let percentageCompleted = (participant.noOfCharacters / paragraph.raw.length) * 100;
        const participantName = participant.id === myId ?
        'You' : participant.name || participant.id;
        let WPM = `: ${Math.ceil(participant.wpm)} WPM`;
        if (participant.waiting) {
          WPM = '';
          percentageCompleted = 0;
        }
        return (
          <li
            style={{ display: finishedRace && participant.isFinished ? 'none' : 'block' }}
            key={participant.id}
          >
            <div
              className="overlay"
              style={{ width: `${percentageCompleted}%`}}
            />
          <span>{`${participantName}${WPM}`}</span>
          </li>
        );
      })}
    </ul>
  );
}

const mapStateToProps = (state) => ({
  show: state.joinedRace || (state.showRaceResult && state.participants.length > 0),
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
