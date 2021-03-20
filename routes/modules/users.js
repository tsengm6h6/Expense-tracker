const express = require('express')
const router = express.Router()

const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { userName, email, password, checkPassword } = req.body
  // 必填未填
  if (!userName || !email || !password || !checkPassword) {
    req.flash('error_msg', ' All fields are required.')
  }
  // 密碼與確認密碼不符合
  if (password !== checkPassword) {
    req.flash('error_msg', ' Passwords do not match.')
  }
  const errorMsg = req.flash('error_msg')
  // 返回原畫面，並顯示錯誤訊息
  if (errorMsg.length) {
    return res.render('register', { userName, email, password, checkPassword, error_msg: errorMsg })
  }
  // 如果已註冊，返回原畫面，顯示錯誤訊息
  User.findOne({ email })
    .then(user => {
      if (user) {
        req.flash('error_msg', ' User already exists.')
        return res.render('register', { userName, email, password, checkPassword, error_msg: req.flash('error_msg') })
      }
      // 未註冊過，則新增到資料庫
      return bcrypt.hash(password, 10)
        .then(hash => User.create({
          userName,
          email,
          password: hash
        }))
        .then(() => res.redirect('/'))
    })
    .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You have successfully logout.')
  res.redirect('/users/login')
})

module.exports = router
