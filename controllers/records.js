import { Record } from '../models/record.js'
import { Bird } from "../models/bird.js"


function newRecord(req, res) {
  res.render('records/new', {
    title: 'Create Record'
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Record.create(req.body)
  .then(record => {
    res.redirect('/records')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
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
    Bird.find({_id: {$nin: record.birds}})
    .then(birds => {
      res.render('records/show', {
        record,
        title: 'Record Details',
        birds,
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/records')
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
  .catch(err => {
    console.log(err)
    res.redirect('/')
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

function addToBirds(req, res) {
  console.log('add birds to record')
}

export {
  newRecord as new,
  create,
  index,
  show,
  edit,
  update,
  approveDelete,
  deleteRecord as delete,
  addToBirds
}