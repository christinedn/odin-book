// TODO: send "you must sign in to view this page" with the header, nav, and footer
function authUser(req, res, next) {
    // console.log(`this is the req.user: ${req.user}`)
    if (req.user == null) {
        return res.render('auth/log-in', {title: 'Log in'})
    }
    next()
}

module.exports = {
    authUser
}