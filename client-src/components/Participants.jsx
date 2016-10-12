import React from 'react'
import { connect } from 'react-redux'

let Participants = ({ participants, paragraph }) => (
  <ul className="skill-list">
    {participants.map(participant => {
      const percentageCompleted = (participant.noOfCharacters / paragraph.length) * 100;
      return (
        <li className="skill" key={participant.id}>
          <h3>{`${participant.id}: ${Math.ceil(participant.wpm)} WPM`}</h3>
          <progress className="skill-1" max="100" value={percentageCompleted}>
            <strong>{`Skill Level: ${percentageCompleted}%`}</strong>
          </progress>
        </li>
      );
    })}
  </ul>
)

const mapStateToProps = (state) => ({
  participants: state.participants,
  paragraph: state.paragraph,
})

Participants = connect(
  mapStateToProps,
)(Participants)

export default Participants;
