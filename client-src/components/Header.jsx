import React from 'react';
import { connect } from 'react-redux';

let Header = ({ dispatch, show, awAppState }) => (
  <header className="header">
    <a className="logo"><img src="/images/logo.png" alt="logo" /></a>
    <a className="profile-pic"><img src={awAppState.user ? awAppState.user.photoId : ''}
     alt={awAppState.user ? awAppState.user.firstName : '' } /></a>
  </header>
);

const mapStateToProps = (state) => ({
  show: (!state.startTimerOn && state.joinedRace && state.finishRace
    && !state.raceStarted && !state.raceAlreadyStarted),
  awAppState: state.awAppState,
})

Header = connect(mapStateToProps)(Header);

export default Header;
