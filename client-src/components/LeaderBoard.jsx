import React from 'react';
import { connect } from 'react-redux';
import { hideLeaderBoard } from '../actions';

let Leaderboard = (props) => {
  const { dispatch, show, leaders } = props;
  return (
    <section
      className="leadersboard-page"
      style={{ display: show ? 'block' : 'none'}}
    >
			<div className="leadersboard-head">
				<i
          className="arrow-left"
          onClick={() => dispatch(hideLeaderBoard())}
        />
				<h5>Leaderboard</h5>
			</div>
			<ul className="leadersboard-user">
        {leaders.map((leader, rank) => (
          <li key={leader._id}>
  					<span className="number">{ rank + 1 }</span>
  					<figure>
  						<img src={leader.imageUrl} alt="user-pic"/>
  					</figure>
  					<span className="name">{leader.name}</span>
  					<span className="speed">{`${Math.ceil(leader.wpm)} WPM`}</span>
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
