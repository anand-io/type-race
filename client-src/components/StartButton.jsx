import React from 'react';
import { connect } from 'react-redux';
import { joinRoom } from '../actions';

let Start = ({ dispatch, show }) => (
  <a
    style={{ display: show ? 'block' : 'none' }}
    onClick={() => {
      dispatch(joinRoom(location.pathname.replace('/', '')));
    }}
  >Start!</a>
);

const mapStateToProps = (state) => ({
  show: !state.gameStarted,
})

Start = connect(mapStateToProps)(Start);

export default Start;
