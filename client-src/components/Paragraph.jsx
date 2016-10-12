import React from 'react'
import { connect } from 'react-redux'

let Paragraph = ({ paragraph, show }) => (
  <p style={{ display: show ? 'block' : 'none' }}>{paragraph}</p>
)

const mapStateToProps = (state) => ({
  paragraph: state.paragraph,
  show: (state.timerOn || state.raceStarted) && !state.finishedRace,
})

Paragraph = connect(
  mapStateToProps,
)(Paragraph)

export default Paragraph;
