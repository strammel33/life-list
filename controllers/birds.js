import { Bird } from "../models/bird.js"
import { Record } from "../models/record.js"

function create(req, res) {
  let name = req.body.name
  console.log(name)
  let record = req.params.recordId
  console.log(record)
  Bird.findOne({name: name})
  .then(bird=> {
    if (bird) {
      console.log('update bird')
      Record.findById(record)
        .populate('birds')
        .then(record => {
          bird.collectedDuring.push(record)
          bird.save()
          record.birds.push(bird)
          record.save()
          .then(birds => {
            res.render('birds/add', {
              birds,
              record,
              title: 'Add Birds'
            })
          })
        })    
    } else {
      console.log('make new bird')
      Bird.create(req.body)
      .then(bird => {
        Record.findById(record)
        .populate('birds')
        .then(record => {
          bird.collectedDuring.push(record)
          bird.save()
          record.birds.push(bird)
          record.save()
          .then(birds => {
            res.render('birds/add', {
              birds,
              record,
              title: 'Add Birds'
            })
          })    
        })
      })
    }
  })
}


function index(req, res) {
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
  .populate('collectedDuring')
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


export{
  create,
  index,
  show
}