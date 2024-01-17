const socketIO = require('socket.io');

function initSocket(server) {
  const io = socketIO(server);
  io.on('connection', (socket) => {
    console.log('A user connected with id: ', socket.id);

    // Handle Socket.IO events here

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
}

module.exports = initSocket;