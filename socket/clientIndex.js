// TODO: link should not be hardcoded?
const socket = io.connect('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to Socket.IO server');
  socket.emit('user-connected', { userId: followerId })
});

socket.on('receive-follow-request', (data) => {
  console.log(`You have a new follower: ${data.followerId}`);
});
