import React from 'react';
import Paragraph from './Paragraph.jsx';
import TypingArea from './TypingArea.jsx';
import JoinButton from './JoinButton.jsx';
import Participants from './Participants.jsx';
import Timer from './Timer.jsx';
import Waiting from './Waiting.jsx';
import RaceAlreadyStarted from './RaceAlreadyStarted.jsx';

let App = () => (
  <div>
    <Participants />
    <Waiting />
    <RaceAlreadyStarted />
    <Paragraph />
    <Timer />
    <TypingArea />
    <JoinButton />
  </div>
)



export default App;
