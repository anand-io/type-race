import React from 'react';
import { connect } from 'react-redux';
import { hideRaceResult, leaveRace } from '../actions';

let RaceResult = (props) => {
  const { dispatch, show, raceResults, myId, joinedRace } = props;
  return (
    <span style={{ display: show ? 'block' : 'none' }}>
			<ul className="completed-user">
        {raceResults.map(result => {
          const participant = result.participant.id === myId ?
          'You' : result.participant.id.split('-')[0];
          let position;
          switch (result.position) {
            case 0: position = 'Disqualified'; break;
            case 1: position = 'Winner'; break;
            case 2: position = 'Runner'; break;
            case 3: position = '3rd place'; break;
            case 4: position = '4th place'; break;
            default: position = result.position;
          }
          return (
            <li key={result.participant.id}>
    					<figure>
    						<img src={result.participant.imageUrl} alt="user-pic" />
    						<figcaption>
    							<span className="name">{result.participant.name}</span>
    							<span className="award">{position}</span>
    							<span className="speed">{`${Math.ceil(result.participant.wpm)} WPM`}</span>
    						</figcaption>
    					</figure>
    				</li>
          );
        })}
			</ul>
			<a
        className="home-btn"
        onClick={() => {
          if (!joinedRace){
            dispatch(hideRaceResult());
          } else {
            dispatch(leaveRace());
            dispatch(hideRaceResult());
          }

        }}
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
  joinedRace: state.joinedRace,
});

RaceResult = connect(mapStateToProps)(RaceResult);

export default RaceResult;
