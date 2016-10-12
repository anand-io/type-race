import React from 'react';
import { connect } from 'react-redux';
import { joinRace } from '../actions';

let Start = ({ dispatch, show }) => (
  <a
    style={{ display: show ? 'block' : 'none' }}
    onClick={() => {
      dispatch(joinRace(location.pathname.replace('/', '')));
    }}
  >Join Race</a>
);

const mapStateToProps = (state) => ({
  show: !state.joinedRace,
})

Start = connect(mapStateToProps)(Start);

export default Start;
