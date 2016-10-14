import React from 'react';
import { connect } from 'react-redux';
import { joinRace } from '../actions';

let PracticeButton = ({ dispatch, show, myId }) => (
  <div
    className='btn btn_primary'
    style={{ display: show ? 'block' : 'none' }}
    onClick={() => {
      dispatch(joinRace( myId, true ));
    }}
  >{"Practice"}</div>
);

const mapStateToProps = (state) => ({
  show: !state.joinedRace,
  myId: state.myInfo.id,
});

PracticeButton = connect(mapStateToProps)(PracticeButton);

export default PracticeButton;
