import React from 'react'
import { connect } from 'react-redux'

function getStyle(typingWordIndex, index) {
  if (index === typingWordIndex)
    return {
      color: 'cornflowerblue',
      fontSize: '30px',
      textDecoration: 'underline'
    }
  else
    return {}
}

let Paragraph = ({ paragraph, show, typingWordIndex }) => (
  <div style={{ display: show ? 'block' : 'none' }}>
    {Array.isArray(paragraph) ?
      paragraph.map((word, index) =>
        <span
        key={index}
        style={getStyle(typingWordIndex, index)} >
          {index == paragraph.legth - 1 ? word : `${word} `}
        </span>) : ''}
  </div>
)

const mapStateToProps = (state) => ({
  paragraph: state.paragraph,
  show: state.everyoneReady,
  typingWordIndex: state.typingWordIndex,
})

Paragraph = connect(
  mapStateToProps,
)(Paragraph)

export default Paragraph;
