import React from 'react';
import Paragraph from './Paragraph.jsx';
import TypingArea from './TypingArea.jsx';
import StartButton from './StartButton.jsx';
import ReadyButton from './ReadyButton.jsx';
import Participants from './Participants.jsx';
import Timer from './Timer.jsx';

let App = () => (
  <div>
    <Participants />
    <Paragraph />
    <Timer />
    <TypingArea />
    <StartButton />
    <ReadyButton />
  </div>
)



export default App;
