const socketIO = require('socket.io');
const Notification = require('../models/notification');
const Follower = require('../models/follower');
const Like = require('../models/like')
const Post = require('../models/post')
const User = require('../models/user')

// store socket instances for each user; key = user.id, value: socket instance
const userSocketMap = new Map() 


function initSocket(server) {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('A user connected with Id: ', socket.id);
    handleUserConnection(socket)
    handlefollowRequests(socket)
    handleAcceptFollowRequest(socket) 
    handleLikePost(socket)
    handleCommentPost(socket)

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

// TODO: remove user from map when they disconnect
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
  socket.on('send-follow-request', async (data) => {
    console.log(`Received send-follow-request event: ${JSON.stringify(data)}`);

    const {followerId, followeeId} = data
    console.log(`followerid: ${followerId}, followeeid: ${followeeId}`)

    // save notification to db
    // TODO: put into function separate? with paramaters(sender, receipt, type)
    // DRY, lot of repetition depending on type of notification
    const notification = new Notification({
      sender: followerId,
      recipient: followeeId,
      message: `You have a new follower request from`,
      type: 'follow-request',
    })

    try {
      await notification.save()
    } catch (err) {
      console.log(err)
    }

    // save follower relationship to db
    const follower = new Follower({
      follower: followerId,
      followee: followeeId,
    })
    console.log(`printing follower object ${follower}`)
    try {
      await follower.save()
      console.log('follower saved into db')
    } catch (err) {
      console.log(err)
    }

    // find the followee from map and send notification to followee
    const followeeSocket = userSocketMap.get(followeeId)

    // TODO: only send the follow request notification to the followee ID, not everyone connected to the socket
    if (followeeSocket) {
      followeeSocket.emit('receive-follow-request', { followerId })
      console.log(`Sent follow notification to User ${followeeId}`);
    }
  })
}

function handleAcceptFollowRequest(socket) {
  socket.on('accept-follow-request', (data) => {
    // update status on follower schema
    Follower.updateOne(
      { follower: data.followerId, followee: data.followeeId }, 
      { $set: { status: 'accepted' } },
    ).then(() => {
      console.log('Successfully updated status to accept')
    })
    .catch((err) => {
      console.log(err)
    })

    // after accepting, remove notification from collection 
    Notification.deleteOne(
      { sender: data.followerId, recipient: data.followeeId },
    )
    .then(() => {
      console.log("Successfully deleted notification")
    })
    .catch((err) => {
      console.log(err)
    })

    // send another notification back to data.followerId to notify that the request has been accepted 
    const notification = new Notification({
      sender: data.followeeId,
      recipient: data.followerId,
      message: ' has accepted your request',
      type: 'follow-request-accepted',
    })

    notification.save()
    .then(() => {
      console.log("Successfully sent a follow request accepted notification")
    })
    .catch(err => {
      console.log(err)
    })

  })
  
}

function handleLikePost(socket) {
  socket.on('liked-post', (data) => {
    // send a notification to post author to notify them that someone liked their post    
    Post.findById(data.postId)
    .then(post => {
      const postAuthorId = post.authorID
      // do not notify user if the post.author === userId
      if (postAuthorId !== data.userId) { // send notification
        const notification = new Notification({
          sender: data.userId,
          recipient: postAuthorId,
          message: ' has liked your post',
          type: 'like',
        })
    
        notification.save()
        .then(() => {
          console.log("Successfully sent a like notification")
        })
        .catch(err => {
          console.log(err)
        })
      }
    })
    .catch(err => console.log(err))

  })
}

function handleCommentPost(socket) {
  // TODO: add what the user commented on the notification? or include the hyperlink to the post that the user commented on
  console.log(`now runnning handleCommentPost in socket server`)
  socket.on('comment-post', (data) => {
    const postAuthorId = data.postAuthorId
    const commentAuthor = data.commentAuthor
    const postId = data.postId
    // find the comment author's ID
    User.find({ username: commentAuthor})
    .then(res => {
      const commentAuthorId = res[0]._id

      // check if commentAuthorId === postAuthorId. if so, do not send notification
      if (commentAuthorId !== postAuthorId) {
        const notification = new Notification({
          sender: commentAuthorId,
          recipient: postAuthorId,
          message: ' has commented on your post',
          type: 'comment',
        })
    
        notification.save()
        .then(() => {
          console.log("Successfully sent a comment notification")
        })
        .catch(err => {
          console.log(err)
        })
      }
      
    })
    .catch(err => console.log(err))
    console.log(data)
  })
}

module.exports = initSocket