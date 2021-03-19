// require express router
const express = require('express')
const router = express.Router()

// require method-override and setting
const methodOverride = require('method-override')
router.use(methodOverride('_method'))

// require body-parser and setting
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))

const home = require('./modules/home')
const expense = require('./modules/expense')
const users = require('./modules/users')

router.use('/', home)
router.use('/expense', expense)
router.use('/users', users)

// export router
module.exports = router
