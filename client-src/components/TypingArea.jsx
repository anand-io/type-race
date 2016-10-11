import React, { Component } from 'react';
import { connect } from 'react-redux';
import { correctWord, increaseWordCount, wrongWord } from '../actions/index.js';

class TypingArea extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.node.addEventListener("keyup", (event) => {
      const { paragraph, typingWordIndex, dispatch } = this.props;
      const words = paragraph.split(' ');
      if (words[typingWordIndex].includes(this.node.value.trim())) {
        dispatch(correctWord());
        if (event.keyCode === 32 && words[typingWordIndex] === this.node.value.trim()){
          const noOfCharacters = paragraph.indexOf(words[typingWordIndex]) +
          words[typingWordIndex].length + 1;
          dispatch(increaseWordCount(noOfCharacters));
          this.node.value = "";
        }
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
