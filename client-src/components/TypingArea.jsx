import React, { Component } from 'react';
import { connect } from 'react-redux';
import { correctWord, nextWord, wrongWord, finishRace } from '../actions/index.js';

const textAreaStyle = (wrongWord, show) => {
  if (!wrongWord) return { display: show ? 'block' : 'none' };
  return {
    color: 'RED',
    display: show ? 'block' : 'none',
  }
}

class TypingArea extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.node.addEventListener("keyup", (event) => {
      const splitedValue = this.node.value.split(' ');
      const nodeValue = splitedValue[0];
      const { paragraph, typingWordIndex, dispatch } = this.props;
      const words = paragraph.words;
      // if (words[typingWordIndex].substring(0, nodeValue.trim().length) !== nodeValue.trim()) {
      //   dispatch(wrongWord());
      // }
      if (words[typingWordIndex].includes(nodeValue.trim())) {
        dispatch(correctWord());
        if (event.keyCode === 32 && words[typingWordIndex] === nodeValue.trim()) {
          if (splitedValue[1]) this.node.value = splitedValue[1];
          else this.node.value = '';
          let noOfCharactersTyped = 0;
          for (let i = 0; i <= typingWordIndex ; i ++) {
            noOfCharactersTyped += words[i].length + 1;
          }
          dispatch(nextWord(noOfCharactersTyped));
        } else if (words.length === typingWordIndex + 1 && nodeValue === words[typingWordIndex]) {
          dispatch(finishRace(paragraph.raw.length));
          this.node.value = '';
        } else if(event.keyCode === 32 && words[typingWordIndex] !== nodeValue.trim()) {
          dispatch(wrongWord());
        }
      } else {
        dispatch(wrongWord());
      }
    });
  }
  render() {
    const { raceStarted, show, wrongWord } = this.props;
    const textProps = {};
    if(!raceStarted) textProps.disabled = true;
    return (
      <textarea
        className='input_default input_big'
        placeholder="Type here"
        style={textAreaStyle(wrongWord, show)}
        ref={node => { this.node = node; }}
        {...textProps}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  show: state.joinedRace && !state.finishedRace,
  raceStarted: state.raceStarted,
  paragraph: state.paragraph,
  typingWordIndex: state.typingWordIndex,
  wrongWord: state.wrongWord,
})

TypingArea = connect(
  mapStateToProps,
)(TypingArea)

export default TypingArea;
