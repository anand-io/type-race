import React from 'react'
import { connect } from 'react-redux'

let TypingArea = ({ raceStarted }) =>{
  const textProps = {};
  if(!raceStarted) textProps.disabled = true;
  return (
    <textarea {...textProps}></textarea>
  );
}

const mapStateToProps = (state) => ({
  raceStarted: state.raceStarted,
})

TypingArea = connect(
  mapStateToProps,
)(TypingArea)

export default TypingArea;
