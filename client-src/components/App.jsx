import React from 'react';
import Paragraph from './Paragraph.jsx';
import TypingArea from './TypingArea.jsx';
import JoinButton from './JoinButton.jsx';
import PracticeButton from './PracticeButton.jsx';
import Participants from './Participants.jsx';
import StartTimer from './StartTimer.jsx';
import RaceTimer from './RaceTimer.jsx';
import Waiting from './Waiting.jsx';
import RaceAlreadyStarted from './RaceAlreadyStarted.jsx';
import RaceResults from './RaceResults.jsx'

let App = () => (
  <div>
    <RaceTimer />
    <Participants />
    <Waiting />
    <RaceAlreadyStarted />
    <Paragraph />
    <StartTimer />
    <TypingArea />
    <RaceResults />
    <JoinButton />
    <PracticeButton />
  </div>
)

export default App;
