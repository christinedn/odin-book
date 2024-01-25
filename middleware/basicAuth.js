function authUser(req, res, next) {
    if (req.user == null) {
        return res.render('auth/log-in', {title: 'Log in'})
    }
    next()
}

module.exports = {
    authUser
}