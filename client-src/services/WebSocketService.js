const data = document.getElementById('data');
const myId = data.getAttribute('myid');
const name = data.getAttribute('name');

function WebSocketService() {}

// Add some event emmiter.
WebSocketService.prototype.init = function init(isAW, onParticipantJoined, onStartCounter,
onParticipantCount, onRaceOver, onChallenge, onNeedAuthorization, onGotAuthorization) {
  this.onParticipantJoined = onParticipantJoined;
  this.onStartCounter = onStartCounter;
  this.onParticipantCount = onParticipantCount;
  this.onRaceOver = onRaceOver;
  this.onChallenge = onChallenge;
  this.onNeedAuthorization = onNeedAuthorization;
  this.onGotAuthorization = onGotAuthorization;
  if(!isAW) {
    this.primus = Primus.connect(`${location.protocol}//${location.host}/?myId=${myId}&name=${name}`);
    this.addListeners();
  }
};

WebSocketService.prototype.connect = function connect(id, name, imageUrl) {
  this.primus = Primus.connect(`${location.protocol}//${location.host}/?myId=${id}&name=${name}
    &imageUrl=${imageUrl}&isAW=true`);
  this.addListeners();
}

WebSocketService.prototype.addListeners = function addListeners() {
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

    this.primus.on('challenge', (from, callback) => {
      this.onChallenge(from, callback);
    });

    this.primus.on('needAuthorization', () => {
      this.onNeedAuthorization();
    });

    this.primus.on('gotAuthorization', () => {
      this.onGotAuthorization();
    });
  });
};

WebSocketService.prototype.joinRace = function joinRoom(room, isPractice, callback) {
  this.primus.send('joinRace', room, isPractice, callback);
}

WebSocketService.prototype.sendReadySignal = function sendReadySignal(room) {
  this.primus.send('ready', room);
}

WebSocketService.prototype.updateWMP = function updateWMP(noOfCharacters, isFinished, disqualified, isPractice) {
  this.primus.send('updateWMP', noOfCharacters, isFinished, disqualified, isPractice);
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

WebSocketService.prototype.challenge = function challenge(to, streamId, accountId, callback) {
  this.primus.send('challenge', to, streamId, callback, accountId);
}

WebSocketService.prototype.leaveRace = function leaveRace() {
  this.primus.send('leaveRace');
}

WebSocketService.prototype.isInstalled = function leaveRace(peerId, callback) {
  this.primus.send('isInstalled', peerId, callback);
}

WebSocketService.prototype.inviteBychat = function inviteBychat(accountId, userId, streamId) {
  this.primus.send('inviteBychat', accountId, userId, streamId);
}

const instance = new WebSocketService();

export default instance;
