import React from 'react';
import Paragraph from './Paragraph.jsx';
import TypingArea from './TypingArea.jsx';
import JoinButton from './JoinButton.jsx';
import Participants from './Participants.jsx';
import StartTimer from './StartTimer.jsx';
import RaceTimer from './RaceTimer.jsx';
import Waiting from './Waiting.jsx';
import RaceAlreadyStarted from './RaceAlreadyStarted.jsx';
import RaceResults from './RaceResults.jsx';
import LeaveRaceButton from './LeaveRaceButton.jsx';

let App = () => (
  <div>
    <LeaveRaceButton />
    <RaceTimer />
    <Participants />
    <Waiting />
    <RaceAlreadyStarted />
    <Paragraph />
    <StartTimer />
    <TypingArea />
    <RaceResults />
    <JoinButton />
  </div>
)

export default App;
