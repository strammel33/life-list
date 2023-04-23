import { Record } from '../models/record.js'

function newRecord(req, res) {
  res.render('records/new', {
    title: 'Add Record'
  })
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
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

function show(req, res) {
  Record.findById(req.params.recordId)
  .populate('birds')
  .then(record => {
    res.render('records/show', {
      record,
      title: 'Record Details'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/records')
  })
}

function edit(req, res) {
  const newRecord = new Record()
  const dt = newRecord.date
  const recordDate = dt.toISOString().slice(0,16)
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Record.findById(req.params.recordId)
  .then(record => {
    res.render('records/edit', {
      record,
      title: 'Edit Record',
      recordDate,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/records')
  })
}


export {
  newRecord as new,
  create,
  addBirds,
  index,
  show,
  edit,
}