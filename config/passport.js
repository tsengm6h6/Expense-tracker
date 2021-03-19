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
    usernameField: 'email'
  }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'user not exist' })
        }
        if (user.password !== password) {
          return done(null, false, { message: 'password is incorrect' })
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
