const express = require('express')
const router = express.Router()

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {

})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { userName, email, password, checkPassword } = req.body
  // 如果已註冊，返回原畫面，TODO:顯示錯誤訊息
  User.findOne({ email })
    .then(user => {
      if (user) {
        return res.render('register', { userName, email, password, checkPassword })
      }
      // 未註冊過，則新增到資料庫
      return User.create({
        userName,
        email,
        password,
        checkPassword
      }).then(() => res.redirect('/'))
    })
    .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {

})

module.exports = router
