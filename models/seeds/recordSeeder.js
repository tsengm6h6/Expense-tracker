// require db
const db = require('../../config/mongoose')

// require Record model
const Record = require('../record')
const records = require('../../records.json')

db.once('open', () => {
  Record.insertMany(records.results)
    .then(() => {
      console.log('Record insert is done')
      return db.close()
    })
    .then(() => console.log('db close'))
    .catch(err => console.log(err))
})
