const Post = require('../models/post')
const Like = require('../models/like')
const Comment = require('../models/comment');


// post_create_get
const post_create_get = (req, res) => {
    res.render('post/create', ({ title: "Create a post"}))
}
// TODO: allow the user to save as draft
// post_create_post
const post_create_post = (req, res) => {
    console.log('creating post object')
    const post = new Post({
        author: req.user.username,
        title: req.body.title,
        content: req.body.content,
        authorID: req.user.id
    })
    console.log('saving post')
    post.save()
    .then(result => {
        console.log('post has been saved')
        res.redirect('/')
    })
    .catch(err => {
        console.log(err)
    })
}

// post_delete
const post_delete = (req, res) => {
    const postId = req.params.id
    Post.findByIdAndDelete(postId)
    .then(result => {
        console.log('deleting post')
        res.json({ redirect: '/'})
    })
    .catch(err => {
        console.log(err)
    })
}

// TODO: use AJAX to make asynchronous request to the server and update the like count dynamically on the client side without refreshing the whole page
const post_like = (req, res) => {
    const userId = req.body.userId
    const postId = req.body.postId

    Promise.all([
        Post.findByIdAndUpdate(
            postId,
            { $inc: { likes: +1} },
            { new: true }
        ),
        Like.create({
            postId: postId,
            userId: userId,
        })
    ])
    .then(([updatedPost, newLike]) => {
        if (!updatedPost) {
            throw new Error('Post not found in post_like function')
        } 
        res.json({ likes: updatedPost.likes })
    })
    .catch(err => console.log(err))
}

// TODO: use AJAX to make asynchronous request to the server and update the like count dynamically on the client side without refreshing the whole page
const post_unlike = (req, res) => {
    const userId = req.body.userId
    const postId = req.body.postId

    Promise.all([
        Post.findByIdAndUpdate(
            postId, 
            { $inc: { likes: -1} }, 
            { new: true }
        ),
        Like.findOneAndDelete(
             { userId, postId} 
        )
    ])
    .then(([updatedPost]) => {
        if (!updatedPost) {
            throw new Error('Post not found in post_unlike function')
        }
        res.json( { likes: updatedPost.likes } )
    })
    .catch(err => console.log(err))
}

const post_comment = (req, res) => {
    console.log(req.body)
    Promise.all([
        Post.findByIdAndUpdate(
            req.body.postId,
            { $inc: { comments: +1 } },
            { new: true}
        ),
        Comment.create({
            author: req.body.commentAuthor,
            postId: req.body.postId,
            content: req.body.commentContent,
            authorId: req.body.userId
        })
    ])
    .then(([updatedPost]) => {
        if (!updatedPost) {
            throw new Error('Post not found in post_comment function')
        }
        res.json({ comments: updatedPost.comments })
    })
    .catch(err => console.log(err))
}

const comments_get = (req, res) => {
    const postId = `${req.params.id}`
    console.log(`now running comments_get and the postId is: ${postId}`)
    Comment.find( {postId: postId} )
    .then(comments => 
        res.json({comments})
    )
    .catch(err => console.log(err))
}

module.exports = {
    post_create_get,
    post_create_post,
    post_delete,
    post_like,
    post_unlike,
    post_comment,
    comments_get
}