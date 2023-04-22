import { Bird } from "../models/bird.js"
import { Record } from "../models/record.js"

function create(req, res) {
  Bird.create(req.body)
  .then (bird => {
    Record.findById(req.params.recordId)
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
      .catch(err => {
      console.log(err)
      res.redirect('/')
      })
    })
    .catch(err => {
    console.log(err)
    res.redirect('/')
    })
  })
}

export{
  create,
}