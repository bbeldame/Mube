import express from 'express';
import http from 'http';
import socketio from 'socket.io';

const app = express();
const server = http.Server(app);
const websocket = socketio(server);
server.listen(3000, () => console.log('listening on *:3000'));

const sockets = [];

// The event will be called when a client is connected.
websocket.on('connection', (socket) => {
  sockets.push(socket);
  console.log('A client just joined on', socket.id);
  socket.on('pattern', (data, idk, much, love) => {
    console.log('data is', data);
    console.log('idk is', idk);
  });

  socket.on('disconnect', function() {
    console.log('Got disconnect!');

    const i = sockets.indexOf(socket);
    sockets.splice(i, 1);
  });

  socket.on('showme', () => {
    console.log(sockets);
    sockets.forEach(function(socket) {
      socket.emit('message', 'hi');
    });
  });

  socket.on('accelerometer', (result) => {
    console.log('result is', result);
  });
});
