import React from 'react'
import { connect } from 'react-redux'

let TypingArea = () => (
  <textarea></textarea>
)

const mapStateToProps = (state) => ({
  participants: state.participants,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch()
  }
})

TypingArea = connect(
  mapDispatchToProps,
)(TypingArea)

export default TypingArea;
