import React from 'react';
import { connect } from 'react-redux';

let Header = ({ dispatch, show }) => (
  <header className="header">
    <a href="" className="logo"><img src="/images/logo.png" alt="logo" /></a>
    <a href="" className="profile-pic"><img src="/images/profile_pic1.png" alt="pic1" /></a>
  </header>
);

const mapStateToProps = (state) => ({
  show: (!state.startTimerOn && state.joinedRace && state.finishRace
    && !state.raceStarted && !state.raceAlreadyStarted),
})

Header = connect(mapStateToProps)(Header);

export default Header;