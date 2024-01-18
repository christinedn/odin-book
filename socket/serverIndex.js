const socketIO = require('socket.io');

// store socket instances for each user; key = user.id, value: socket instance
const userSocketMap = new Map() 


function initSocket(server) {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('A user connected with Id: ', socket.id);
    handleUserConnection(socket)
    handlefollowRequests(socket)

    // TODO: remove from socket map when user disconnects
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
}

function handleUserConnection(socket) {
  socket.on('user-connected', (data) => {
    const { userId } = data
    if (userId) {
      userSocketMap.set(userId, socket);
      console.log(`User ${userId} connected and added to userSocketMap`);
    }
  })
}

// function handleUserDisconnection(socket) {
//   // Assume you have a user ID associated with the socket (you need to implement this logic)
//   const userId = getUserIdFromSocket(socket);

//   // Remove user from userSocketMap on disconnection
//   if (userId) {
//     userSocketMap.delete(userId);
//     console.log(`User ${userId} disconnected and removed from userSocketMap`);
//   }
// }

function handlefollowRequests(socket) {
  socket.on('send-follow-request', (data) => {
    console.log(`Received send-follow-request event: ${JSON.stringify(data)}`);

    const {followerId, followeeId} = data
    console.log(`followerid: ${followerId}, followeeid: ${followeeId}`)

    // this emits it to the socket that the follower is currently connected to
    // socket.emit('receive-follow-request', { followerId })


    console.log(`setting the map with ${followerId} to map to ${socket}`)
    userSocketMap.set(followerId, socket)

    const followeeSocket = userSocketMap.get(followeeId)
    // console.log(`now printing followeeSocket: ${followeeSocket.}`)

    // TODO: only send the follow request notification to the followee ID, not everyone connected to the socket
    if (followeeSocket) {
      followeeSocket.emit('receive-follow-request', { followerId })
      console.log(`Sent follow notification to User ${followeeId}`);
    }
  })
}


module.exports = initSocket