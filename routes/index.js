// require express router
const express = require('express')
const router = express.Router()

// require method-override and setting
const methodOverride = require('method-override')

// require body-parser and setting
const bodyParser = require('body-parser')
const { authenticator } = require('../middleware/auth')

const home = require('./modules/home')
const expense = require('./modules/expense')
const users = require('./modules/users')
const auth = require('./modules/auth')

router.use(methodOverride('_method'))
router.use(bodyParser.urlencoded({ extended: true }))

router.use('/expense', authenticator, expense)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

// export router
module.exports = router
