const Post = require('../models/post')

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

module.exports = {
    post_create_get,
    post_create_post,
    post_delete
}