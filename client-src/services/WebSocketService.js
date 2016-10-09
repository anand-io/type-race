const myId = document.getElementById('data').getAttribute('myid');

function WebSocketService() {}

// Add some event emmiter.
WebSocketService.prototype.init = function init(onParticipantJoined, onParticipantReady,
onEveryoneReady) {
  this.primus = Primus.connect(`http://localhost:3000/?myId=${myId}`);
  this.onParticipantJoined = onParticipantJoined;
  this.onParticipantReady = onParticipantReady;
  this.onEveryoneReady = onEveryoneReady;
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

    this.primus.on('everyoneReady', participant => {
      this.onEveryoneReady();
    });

  });
};

WebSocketService.prototype.joinRoom = function joinRoom(room, callback) {
  this.primus.send('joinRoom', room, callback);
}

WebSocketService.prototype.sendReadySignal = function joinRoom(room) {
  this.primus.send('ready', room);
}

const instance = new WebSocketService();

export default instance;
