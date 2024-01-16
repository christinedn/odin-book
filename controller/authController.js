const User = require('../models/user')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const passport = require("passport");

// sign_up_get
const sign_up_get = (req, res) => {
    res.render('auth/sign-up', ({ title: 'Sign up'}))
}

// sign_up_post
const sign_up_post = [
    // validating password
    body('passwordConfirmation').custom((value, { req }) => {
        console.log(`this is the value: ${value}, this is the req.body.password: ${req.body.password}`)
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        } else {
            return true;
        }
    }),
    // validating username
    body('username').custom(async (value) => {
        const existingUsername = await User.findOne({ username: value });
        if (existingUsername) {
            throw new Error('Username already exists');
        } else {
            return true;
        }
    }),
    
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const user = new User({
                username: req.body.username,
                password: hashedPassword,
            })
            // use await to only redirect when user is saved
            await user.save()
            res.redirect('/');
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
]

// log_in_get
const log_in_get = (req, res) => {
    res.render('auth/log-in', {title: 'Log in'})
}

// log_in_post
const log_in_post = (req, res, next) => {
    passport.authenticate("local", (err, user) => {
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            console.log('now logging in user')
            return res.json({ success: true });
        });
    })(req, res, next);
}

// log_out_get
const log_out_get = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
            res.redirect("log-in");
    });
}

module.exports = {
    sign_up_get,
    sign_up_post,
    log_in_get,
    log_in_post,
    log_out_get
}