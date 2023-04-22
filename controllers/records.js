import { Record } from '../models/record.js'

function newRecord(req, res) {
  res.render('records/new', {
    title: 'Add Record'
  })
}

export {
  newRecord as new,
}