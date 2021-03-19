// require express router
const express = require('express')
const router = express.Router()

const home = require('./modules/home')
router.use('/', home)

const expense = require('./modules/expense')
router.use('/expense', expense)

const users = require('./modules/users')
router.use('/users', users)

// export router
module.exports = router
