import { Record } from '../models/record.js'

function newRecord(req, res) {
  res.render('records/new', {
    title: 'Add Record'
  })
}

function create(req, res) {
  Record.create(req.body)
  .then (record => {
    console.log('redirect to add birds')
    res.redirect(`/records/${record._id}/addbirds`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function addBirds(req, res) {
  Record.findById(req.params.recordId)
  .then(record => {
    res.render('birds/add', {
      record: record,
      title: 'Add Birds'
    })
  })
}

function index(req, res) {
  Record.find({})
  .then(records => {
    res.render('records/index', {
      records,
      title: 'All Records'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  newRecord as new,
  create,
  addBirds,
  index,
}