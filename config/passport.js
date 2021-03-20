// 1. Authentication strategies
// 2. Application middleware
// 3. Sessions(optional)

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
// TODO: FB Strategy

const User = require('../models/user')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  }, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          req.flash('error_msg', 'Incorrect user email.')
          return done(null, false)
        }
        if (user.password !== password) {
          req.flash('error_msg', 'Incorrect password.')
          return done(null, false)
        }
        return done(null, user)
      }).catch(err => done(err))
  }
  ))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err))
  })
}
