import React from 'react';
import { connect } from 'react-redux';
import { joinRace } from '../actions';

let PracticeButton = ({ dispatch, show }) => (
  <div
    className='btn btn_primary'
    style={{ display: show ? 'block' : 'none' }}
    onClick={() => {
      dispatch(joinRace( `Practice-${document.getElementById('data').getAttribute('myid')}`));
    }}
  >{"Practice"}</div>
);

const mapStateToProps = (state) => ({
  show: !state.joinedRace,
});

PracticeButton = connect(mapStateToProps)(PracticeButton);

export default PracticeButton;
