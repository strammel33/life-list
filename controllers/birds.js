import { Bird } from "../models/bird.js"
import {Profile} from '../models/profile.js'

function newBird(req, res) {
  res.render('birds/new', {
    title: 'New Life List Entry'
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  Bird.create(req.body)
  .then (bird => {
    res.redirect(`/birds/${bird._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function index(req, res){
  Profile.findById(req.user.profile._id)
  .then(profile => {
    Bird.find({})
    .then(birds => {
      res.render('birds/index', {
        profile,
        birds,
        title: 'My Life List'
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Bird.findById(req.params.birdId)
  .then(bird => {
    res.render('birds/show', {
      bird,
      title: 'Bird Details'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/birds')
  })
}

function addInstance(req, res) {
  Bird.findById(req.params.birdId)
  .then(bird => {
    bird.instances.push(req.body)
    bird.save()
    .then(() => {
      res.redirect(`/birds/${bird._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/birds')
  })
}

function edit(req, res) {
  Bird.findById(req.params.birdId)
  .then(bird => {
    res.render('birds/edit', {
      bird,
      title: 'Edit Bird',
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function update(req, res) {
  Bird.findById(req.params.birdId)
  .then(bird => {
    if (bird.owner.equals(req.user.profile._id)) {
      bird.updateOne(req.body)
      .then(() => {
        res.redirect(`/birds/${bird._id}`)
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
  Bird.findById(req.params.birdId)
  .then(bird=> {
    res.render('birds/delete', {
      bird,
      title: 'Delete'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deleteBird(req, res) {
  Bird.findById(req.params.birdId)
  .then(bird => {
    if (bird.owner.equals(req.user.profile._id)) {
      bird.deleteOne()
      .then(() => {
        res.redirect('/birds')
      })
    } else {
      throw new Error ('Not Authorized')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/birds')
  })
}

function deleteInstance(req, res) {
  Bird.findById(req.params.birdId)
  .then(bird => {
    if (bird.owner.equals(req.user.profile._id)) {
      bird.instances.remove(req.params.instanceId)
      bird.save()
      .then(() => {
        res.redirect(`/birds/${bird._id}`)
      })
    } else {
      throw new Error ('Not Authorized')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/birds')
  })
}


export {
  newBird as new,
  index,
  create,
  show,
  addInstance,
  edit,
  update,
  approveDelete,
  deleteBird as delete,
  deleteInstance,
}