const data = document.getElementById('data');
const myId = data.getAttribute('myid');
const name = data.getAttribute('name');

function WebSocketService() {}

// Add some event emmiter.
WebSocketService.prototype.init = function init(onParticipantJoined, onStartCounter,
  onParticipantCount, onRaceOver) {
  this.primus = Primus.connect(`${location.protocol}//${location.host}/?myId=${myId}&name=${name}`);
  this.onParticipantJoined = onParticipantJoined;
  this.onStartCounter = onStartCounter;
  this.onParticipantCount = onParticipantCount;
  this.onRaceOver = onRaceOver;
  this.addListeners();
};

WebSocketService.prototype.addListeners = function addListeners(pri) {
  this.primus.on('open', () => {

    this.primus.on('participantJoined', participant => {
      this.onParticipantJoined(participant);
    });

    this.primus.on('participantReady', participant => {
      this.onParticipantReady(participant);
    });

    this.primus.on('startCounter', () => {
      this.onStartCounter();
    });

    this.primus.on('participantWordCount', data => {
      this.onParticipantCount(data);
    });

    this.primus.on('raceOver', data => {
      this.onRaceOver(data);
    });

  });
};

WebSocketService.prototype.joinRace = function joinRoom(room, isPractice, callback) {
  this.primus.send('joinRace', room, isPractice, callback);
}

WebSocketService.prototype.sendReadySignal = function sendReadySignal(room) {
  this.primus.send('ready', room);
}

WebSocketService.prototype.updateWMP = function updateWMP(noOfCharacters, isFinished, disqualified) {
  this.primus.send('updateWMP', noOfCharacters, isFinished, disqualified);
}

WebSocketService.prototype.raceStarted = function raceStarted(noOfCharacters) {
  this.primus.send('raceStarted');
}

WebSocketService.prototype.finishedRace = function finishedRace(noOfCharacters) {
  this.primus.send('finishedRace');
}

WebSocketService.prototype.getLeaders = function getLeaders(callback) {
  this.primus.send('getLeaders', callback);
}

const instance = new WebSocketService();

export default instance;
