import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import _ from 'lodash';

const app = express();
const server = http.Server(app);
const websocket = socketio(server);
server.listen(3000, () => console.log('listening on *:3000'));

const sockets = [];
const rooms = [];

// The event will be called when a client is connected.
websocket.on('connection', (socket) => {
  console.log('salut', socket.id, socket.handshake.headers.host);
  sockets.push(socket);
  socket.inRoom = false;
  socket.on('pattern', (data) => {
    let matchingRoom = rooms.filter((room, index) => {
      // On supprime toutes les rooms qui ont été créées il y a plus de 10 secs
      if ((Date.now() - room.datePattern) / 1000 > 10){
        room.first.inRoom = null;
        if (room.second != undefined){
          room.second.inRoom = null;
        }
        delete rooms[index]; 
      }
      return _.isEqual(room.pattern, data.pattern)
    });

    // Si on a matché et si celui dans la room n'est pas nous
    if (matchingRoom.length > 0 && matchingRoom[0].first != socket){
      matchingRoom = matchingRoom[0];
      matchingRoom.second = socket;
      socket.inRoom = true;

      socket.friend = matchingRoom.first;
      matchingRoom.first.friend = socket;
      // Si on a pas matché de room et si on est pas dans une room
    } else if (matchingRoom.length == 0 && !socket.inRoom){
      rooms.push(
        {
          first: socket,
          pattern: data.pattern,
          datePattern: Date.now()
        }
      )

      socket.inRoom = true;
    } else {
      matchingRoom[0].datePattern = Date.now();
    }

    console.log(rooms);
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

  socket.on('accelerometer', (data) => {
    console.log('data', data);
    if (socket.friend != undefined){
      console.log('Sendind', data, 'to' + socket.friend.id);
      socket.friend.emit('friendAccelerometer', data);
    } else {
      // console.log('Not sending data to anyone!');
    }
  });
});
