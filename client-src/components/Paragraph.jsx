import React from 'react'
import { connect } from 'react-redux'

function getStyle(typingWordIndex, index) {
  if (index === typingWordIndex)
    return {
      color: 'cornflowerblue',
      fontSize: '25px',
      textDecoration: 'underline'
    }
  else
    return {}
}

let Paragraph = ({ paragraph, show, typingWordIndex }) => (
  <div style={{ display: show ? 'block' : 'none', width:'300px' }}>
    {Array.isArray(paragraph.words) ?
      paragraph.words.map((word, index) =>
        <span
        key={index}
        style={getStyle(typingWordIndex, index)} >
          {index == paragraph.length - 1 ? word : `${word} `}
        </span>) : ''}
  </div>
)

const mapStateToProps = (state) => ({
  paragraph: state.paragraph,
  show: (state.timerOn || state.raceStarted) && !state.finishedRace,
  typingWordIndex: state.typingWordIndex,
})

Paragraph = connect(
  mapStateToProps,
)(Paragraph)

export default Paragraph;
