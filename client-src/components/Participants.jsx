import React from 'react'
import { connect } from 'react-redux'

let Participants = ({ participants }) => (
  <div>
    {participants.map(participant => (
      <div key={participant.id}>
        {participant.id} {participant.wpm}
      </div>
    ))}
  </div>
)

const mapStateToProps = (state) => ({
  participants: state.participants,
})

Participants = connect(
  mapStateToProps,
)(Participants)

export default Participants;
