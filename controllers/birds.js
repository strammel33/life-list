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
    res.render('birds/index', {
      bird,
      title: 'Add Details'
    })
  })
}

function index(req, res){

}

export {
  newBird as new,
  index,
  create,
}