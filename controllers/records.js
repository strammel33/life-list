import { Record } from '../models/record.js'
import { Bird } from "../models/bird.js"
import { Profile } from "../models/profile.js"


function newRecord(req, res) {
  res.render('records/new', {
    title: 'Create Record'
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
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
  Profile.find(req.user.profile._id)
  .then(profile => {
    Record.find({})
    .then(records => {
      res.render('records/index', {
        profile,
        records,
        title: 'All Records'
      })
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
  Record.findById(req.params.recordId)
  .then(record => {
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
  Record.findById(req.params.recordId)
  .then(record => {
    record.birds.push(req.body.birdId)
    record.save()
    .then(() => {
      res.redirect(`/records/${record._id}`)
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

function removeBird(req, res) {
  Record.findById(req.params.recordId)
  .then(record => {
    record.birds.remove(req.params.birdId)
    record.save()
    .then(() => {
      res.redirect(`/records/${record._id}`)
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

export {
  newRecord as new,
  create,
  index,
  show,
  edit,
  update,
  approveDelete,
  deleteRecord as delete,
  addToBirds,
  removeBird
}