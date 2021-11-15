'use strict';

const { Server } = require('socket.io');
const io = new Server({
  cors: {
    origin: '*',
    methods: ['PUT', 'GET', 'POST', 'DELETE', 'OPTIONS'],
  },
});

io.on('connection', socket => {
  socket.on('from.client', message => {
    console.info('MESSAGE: ', message);
    socket.broadcast.emit('from.server', message);
  });
});

io.listen(3000);
