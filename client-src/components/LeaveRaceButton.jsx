import React from 'react';
import { connect } from 'react-redux';
import { joinRace, finishRace } from '../actions';

let LeaveRace = ({ dispatch, show, noOfCharactersTyped }) => (
  <div
    className='btn btn_primary leave-race'
    style={{ display: show ? 'block' : 'none' }}
    onClick={() => {
      dispatch(finishRace(noOfCharactersTyped, true));
    }}
  >{'Leave'}</div>
);

const mapStateToProps = (state) => ({
  show: (state.joinedRace && !state.finishRace),
  noOfCharactersTyped: state.noOfCharactersTyped,
})

LeaveRace = connect(mapStateToProps)(LeaveRace);

export default LeaveRace;
