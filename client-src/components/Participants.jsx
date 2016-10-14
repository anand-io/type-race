import React from 'react'
import { connect } from 'react-redux'

let Participants = ({ participants, paragraph, finishedRace, myId }) => (
  <ul className="challenge-user">
    {participants.map(participant => {
      const percentageCompleted = (participant.noOfCharacters / paragraph.raw.length) * 100;
      const participantId = participant.id === myId ?
      'You' : participant.id.split('-')[0];
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
          <span>{`${participantId}: ${Math.ceil(participant.wpm)} WPM`}</span>
        </li>
      );
    })}
  </ul>
)

const mapStateToProps = (state) => ({
  participants: state.participants,
  paragraph: state.paragraph,
  finishedRace: state.finishedRace,
  myId: state.myInfo.id,
})

Participants = connect(
  mapStateToProps,
)(Participants)

export default Participants;
