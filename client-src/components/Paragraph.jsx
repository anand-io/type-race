import React, { Component }from 'react'
import { connect } from 'react-redux'


class Paragraph extends Component {
  componentDidUpdate() {
    if (this.currentWordNode) this.currentWordNode.scrollIntoView();
  }

  render() {
    const { paragraph, show, typingWordIndex, wrongWord, placeholder, participantsHeight, noOfCharactersTyped } = this.props;
    const height = 430 - 120 - participantsHeight;
    let [firstPart, currentWord, lastPart] = ['', '', ''];
    if (paragraph.raw) {
      firstPart = paragraph.raw.substring(0, noOfCharactersTyped);
      currentWord = paragraph.words[typingWordIndex];
      const currentWordEndIndex = noOfCharactersTyped + paragraph.words[typingWordIndex].length;
      lastPart = paragraph.raw.substring(currentWordEndIndex, paragraph.raw.length);
    }
    const currentWordStyle = {
      color: wrongWord ? '#DE2626' : '#83C447',
      textDecoration: 'underline',
    };
    return (
      <div
        className='paragraph'
        style={{ display: show ? 'block' : 'none', height }}
      >
        {
          !placeholder && paragraph.words ?
          <span>
            <span>{firstPart}</span>
            <span style={currentWordStyle} ref={node => { this.currentWordNode = node; }}>{currentWord}</span>
            <span>{lastPart}</span>
          </span>
            :
          <div className="temp_item">
              <div className="temp_line animated-background" />
              <div className="temp_line animated-background" />
              <div className="temp_line animated-background" />
              <div className="temp_line animated-background" />
              <div className="temp_line animated-background" />
              <div className="temp_line animated-background" />
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  paragraph: state.paragraph,
  show: state.joinedRace && !state.finishedRace,
  typingWordIndex: state.typingWordIndex,
  wrongWord: state.wrongWord,
  placeholder: state.participants.length === 1 && !state.isPractice,
  participantsHeight: state.participantsHeight,
  noOfCharactersTyped: state.noOfCharactersTyped,
})

Paragraph = connect(
  mapStateToProps,
)(Paragraph)

export default Paragraph;
