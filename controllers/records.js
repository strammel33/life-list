import { Record } from '../models/record.js'

function newRecord(req, res) {
  res.render('records/new', {
    title: 'Add Record'
  })
}

function create(req, res) {
  Record.create(req.body)
  .then (record => {
    console.log('redirect to record to add birds')
    res.redirect(`/redirect/${record._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  newRecord as new,
  create,
}