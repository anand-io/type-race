const myId = document.getElementById('data').getAttribute('myid');

function WebSocketService() {}

// Add some event emmiter.
WebSocketService.prototype.init = function init(onParticipantJoined, onParticipantReady,
onEveryoneReady, onParticipantCount) {
  this.primus = Primus.connect(`http://localhost:3000/?myId=${myId}`);
  this.onParticipantJoined = onParticipantJoined;
  this.onParticipantReady = onParticipantReady;
  this.onEveryoneReady = onEveryoneReady;
  this.onParticipantCount = onParticipantCount;
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

    this.primus.on('everyoneReady', () => {
      this.onEveryoneReady();
    });

    this.primus.on('participantWordCount', data => {
      this.onParticipantCount(data);
      console.log(data);
    });

  });
};

WebSocketService.prototype.joinRoom = function joinRoom(room, callback) {
  this.primus.send('joinRoom', room, callback);
}

WebSocketService.prototype.sendReadySignal = function sendReadySignal(room) {
  this.primus.send('ready', room);
}

WebSocketService.prototype.calculateCharacterCount = function increaseWordCount(noOfCharacters) {
  this.primus.send('wordCount', location.pathname.replace('/', ''), noOfCharacters);
}

const instance = new WebSocketService();

export default instance;
