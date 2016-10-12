import React, { Component } from 'react';
import { connect } from 'react-redux';
import { correctWord, increaseWordCount, wrongWord, finishedTheRace } from '../actions/index.js';

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
      const words = paragraph.split(' ');
      if (words[typingWordIndex].includes(nodeValue.trim())) {
        if (event.keyCode === 32 && words[typingWordIndex] === nodeValue.trim()) {
          if (splitedValue[1]) this.node.value = splitedValue[1];
          else this.node.value = '';
          if (typingWordIndex === words.length - 1) {
            dispatch(finishedTheRace(paragraph.length));
            return;
          }
          let noOfCharacters = 0;
          for (let i = 0; i <= typingWordIndex ; i ++) {
            noOfCharacters += words[i].length + 1;
          }
          dispatch(increaseWordCount(noOfCharacters));
        }
        dispatch(correctWord());
      } else {
        dispatch(wrongWord());
      }
    });
  }
  render() {
    const { raceStarted } = this.props;
    const textProps = {};
    if(!raceStarted) textProps.disabled = true;
    return (
      <textarea ref={node => { this.node = node; }} {...textProps}></textarea>
    );
  }
}

const mapStateToProps = (state) => ({
  raceStarted: state.raceStarted,
  paragraph: state.paragraph,
  typingWordIndex: state.typingWordIndex,
})

TypingArea = connect(
  mapStateToProps,
)(TypingArea)

export default TypingArea;
