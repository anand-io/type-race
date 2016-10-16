import React from 'react';
import { connect } from 'react-redux';

let Header = ({ dispatch, show, awUser }) => (
  <header className="header">
    <a className="logo"><img src="/images/logo.png" alt="logo" /></a>
    <a className="profile-pic"><img src={awUser ? awUser.photoId : ''}
     alt={awUser ? awUser.firstName : '' } /></a>
    {/* <a className="profile-pic"><img src="/images/default-user.png" alt="pic1" /></a> */}
  </header>
);

const mapStateToProps = (state) => ({
  show: (!state.startTimerOn && state.joinedRace && state.finishRace
    && !state.raceStarted && !state.raceAlreadyStarted),
  awUser: state.awUser,
})

Header = connect(mapStateToProps)(Header);

export default Header;
