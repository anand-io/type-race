import React from 'react'
import { connect } from 'react-redux'

const getStyle = (typingWordIndex, index, wrongWord) => {
  if (index !== typingWordIndex) return {}
  return {
    color: wrongWord ? 'RED' : 'cornflowerblue',
    fontSize: '19px',
  }
}

let Paragraph = ({ paragraph, show, typingWordIndex, wrongWord, placeholder, participantsHeight }) => {
  const height = 430 - 120 - participantsHeight;
  return (
    <div
      className='paragraph'
      style={{ display: show ? 'block' : 'none', height }}
    >
      {
        !placeholder && paragraph.words ?
        paragraph.words.map((word, index) =>
          <span
          key={index}
          style={getStyle(typingWordIndex, index, wrongWord)} >
            {index == paragraph.length - 1 ? word : `${word} `}
          </span>)
          :
        <div className="temp_item">
            <div className="temp_line" />
            <div className="temp_line" />
            <div className="temp_line" />
            <div className="temp_line" />
            <div className="temp_line" />
            <div className="temp_line" />
        </div>
      }
    </div>
  );
}

const mapStateToProps = (state) => ({
  paragraph: state.paragraph,
  show: state.joinedRace && !state.finishedRace,
  typingWordIndex: state.typingWordIndex,
  wrongWord: state.wrongWord,
  placeholder: state.participants.length === 1 && !state.isPractice,
  participantsHeight: state.participantsHeight,
})

Paragraph = connect(
  mapStateToProps,
)(Paragraph)

export default Paragraph;
