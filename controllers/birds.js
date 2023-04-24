import { Bird } from "../models/bird.js"
import { Record } from "../models/record.js"


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
  Bird.find({})
  .then(birds => {
    res.render('birds/index', {
      birds,
      title: 'Life List'
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

export {
  newBird as new,
  index,
  create,
  show,
  addInstance,

}