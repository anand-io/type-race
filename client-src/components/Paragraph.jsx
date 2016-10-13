import React from 'react'
import { connect } from 'react-redux'

const getStyle = (typingWordIndex, index, wrongWord) => {
  if (index !== typingWordIndex) return {}
  return {
    color: wrongWord ? 'RED' : 'cornflowerblue',
    fontSize: '25px',
    textDecoration: 'underline'
  }
}

let Paragraph = ({ paragraph, show, typingWordIndex, wrongWord }) => (
  <div style={{ display: show ? 'block' : 'none', width:'300px' }}>
    {Array.isArray(paragraph.words) ?
      paragraph.words.map((word, index) =>
        <span
        key={index}
        style={getStyle(typingWordIndex, index, wrongWord)} >
          {index == paragraph.length - 1 ? word : `${word} `}
        </span>) : ''}
  </div>
)

const mapStateToProps = (state) => ({
  paragraph: state.paragraph,
  show: (state.startTimerOn || state.raceStarted) && !state.finishedRace,
  typingWordIndex: state.typingWordIndex,
  wrongWord: state.wrongWord
})

Paragraph = connect(
  mapStateToProps,
)(Paragraph)

export default Paragraph;
