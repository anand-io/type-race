import React from 'react';
import { connect } from 'react-redux';
import { getReady } from '../actions';

let Ready = ({ dispatch, show }) => (
  <a
    style={{ display: show ? 'block' : 'none' }}
    onClick={() => {
      dispatch(getReady(location.pathname.replace('/', '')));
    }}
  >Ready</a>
);

const mapStateToProps = (state) => ({
  show: !state.iamReady && state.gameStarted,
})

Ready = connect(mapStateToProps)(Ready);

export default Ready;
