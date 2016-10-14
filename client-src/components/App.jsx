import React from 'react';

import Header from './Header.jsx';
import Home from './Home.jsx';
import Challenge from './Challenge.jsx';

// import Paragraph from './Paragraph.jsx';
// import TypingArea from './TypingArea.jsx';
import JoinButton from './JoinButton.jsx';
import PracticeButton from './PracticeButton.jsx';
import Participants from './Participants.jsx';
import StartTimer from './StartTimer.jsx';
import RaceTimer from './RaceTimer.jsx';
import Waiting from './Waiting.jsx';
import RaceAlreadyStarted from './RaceAlreadyStarted.jsx';
import RaceResults from './RaceResults.jsx';
import LeaveRaceButton from './LeaveRaceButton.jsx';

let App = () => (
  <div className="wrapper">
    <Header />
    <Home />
    <Challenge />
  </div>
)

// <LeaveRaceButton />
// <RaceTimer />
// <Participants />
// <Waiting />
// <RaceAlreadyStarted />
// <Paragraph />
// <StartTimer />
// <TypingArea />
// <RaceResults />
// <JoinButton />
// <PracticeButton />

export default App;
