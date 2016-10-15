import React from 'react';
import { connect } from 'react-redux';

let Leaderboard = (props) => {
  const { dispatch, show, leaders } = props;
  return (
    <section
      className="leadersboard-page"
      style={{ display: show ? 'block' : 'none'}}
    >
			<div className="leadersboard-head">
				<i className="arrow-left"></i>
				<h5>Leadersboard</h5>
			</div>
			<ul className="leadersboard-user">
        {leaders.map((leader, rank) => (
          <li>
  					<span className="number">{ rank + 1 }</span>
  					<figure>
  						<img src="/images/default-user.png" alt="user-pic"/>
  					</figure>
  					<span className="name">{leader.name}</span>
  					<span className="speed">{`${Math.ceil(leader.wpm)}WPM`}</span>
  				</li>
        ))}
			</ul>
		</section>
  );
}

const mapStateToProps = (state) => ({
  show: state.showLeaderBoard,
  leaders: state.leaders,
});

Leaderboard = connect(mapStateToProps)(Leaderboard);

export default Leaderboard;
