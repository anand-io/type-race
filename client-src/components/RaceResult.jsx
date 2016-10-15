import React from 'react';
import { connect } from 'react-redux';
import { hideRaceResult } from '../actions';

let RaceResult = (props) => {
  const { dispatch, show, raceResults, myId } = props;
  return (
    <span style={{ display: show ? 'block' : 'none' }}>
			<ul className="completed-user">
        {raceResults.map(result => {
          const participant = result.participant.id === myId ?
          'You' : result.participant.id.split('-')[0];
          return (
            <li key={result.participant.id}>
    					<figure>
    						<img src="/images/user-icon.jpeg" alt="user-pic"/>
    						<figcaption>
    							<span className="name">{result.participant.name}</span>
    							<span className="award">{`${result.position ? `${result.position} place` : 'Disqualified'}`}</span>
    							<span className="speed">{Math.ceil(result.participant.wpm)}</span>
    						</figcaption>
    					</figure>
    				</li>
          );
        })}
			</ul>
			<a
        className="home-btn"
        onClick={() => dispatch(hideRaceResult())}
      >
        <img src="/images/home-btn.png" />
      </a>
		</span>
  );
}

const mapStateToProps = (state) => ({
  raceResults: state.raceResults,
  show: state.showRaceResult,
  myId: state.myInfo.id,
});

RaceResult = connect(mapStateToProps)(RaceResult);

export default RaceResult;
