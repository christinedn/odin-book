// TODO: link should not be hardcoded?
const socket = io.connect('http://localhost:3000');
  
socket.on('connect', () => {
  console.log('Connected to Socket.IO server');
});