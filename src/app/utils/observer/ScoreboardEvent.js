export default class ScoreboardEvent {
  constructor(server) {
    this.scoreboardSocket = server.of('/scoreboard');

    this.initEvents();
  }

  initEvents() {
    this.scoreboardSocket.on('connection', client => {
      client.on('scoreboardMessage', data => {
        client.broadcast.emit('receivedMessage', data);
      });
    });
  }
}
