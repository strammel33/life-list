import { Record } from '../models/record.js'

function newRecord(req, res) {
  res.render('records/new', {
    title: 'Add Record'
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
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
    res.render('birds/new', {
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
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Record.findById(req.params.recordId)
  .then(record => {
    res.render('records/edit', {
      record,
      title: 'Edit Record',
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function update(req, res) {
  console.log(req.params.recordId)
  Record.findById(req.params.recordId)
  .then(record => {
    console.log(record)
    if (record.owner.equals(req.user.profile._id)) {
      record.updateOne(req.body)
      .then(() => {
        res.redirect(`/records/${record._id}`)
      })
    } else {
      throw new Error('Not authorized')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function approveDelete(req, res) {
  Record.findById(req.params.recordId)
  .then(record => {
    res.render('records/delete', {
      record,
      title: 'Delete'
    })
  })
}

function deleteRecord(req, res) {
  Record.findById(req.params.recordId)
  .then(record => {
    if (record.owner.equals(req.user.profile._id)) {
      record.deleteOne()
      .then(() => {
        res.redirect('/records')
      })
    } else {
      throw new Error ('Not Authorized')
    }
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
  update,
  approveDelete,
  deleteRecord as delete,
}