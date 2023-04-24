import { Bird } from "../models/bird.js"
import { Record } from "../models/record.js"

function create(req, res) {
  req.body.owner = req.user.profile._id
  Record.findById(req.params.recordId)
  .then(record => {
    let name = req.body.name
    Bird.findOne({name: name})
    .then(bird => {
      if (bird) {
        bird.instances.push(req.body)
        bird.save()
        record.birds.push(bird)
        record.save()
        console.log('updated bird', bird)
      } else (
        Bird.create(req.body)
        .then (bird => {
          bird.instances.push(req.body)
          bird.save()
          record.birds.push(bird)
          record.save()
          console.log('new bird', bird)
        })
      )
    })
  })
}

// function create(req, res) {
//   let name = req.body.name
//   console.log(name)
//   let record = req.params.recordId
//   console.log(record)
//   Bird.findOne({name: name})
//   .then(bird=> {
//     if (bird) {
//       console.log('update bird')
//       Record.findById(record)
//         .populate('birds')
//         .then(record => {
//           bird.collectedDuring.push(record)
//           bird.save()
//           record.birds.push(bird)
//           record.save()
//           .then(birds => {
//             res.render('birds/add', {
//               birds,
//               record,
//               title: 'Add Birds'
//             })
//           })
//         })    
//     } else {
//       console.log('make new bird')
//       Bird.create(req.body.name)
//       .then(bird => {
//         bird.instances.push(req.body)
//         console.log(bird)
//         Record.findById(record)
//         .populate('birds')
//         .then(record => {
//           bird.collectedDuring.push(record)
//           bird.save()
//           record.birds.push(bird)
//           record.save()
//           .then(birds => {
//             res.render('birds/add', {
//               birds,
//               record,
//               title: 'Add Birds'
//             })
//           })    
//         })
//       })
//     }
//   })
// }

// function create(req, res) {
//   Bird.create(req.body)
//   .then (bird => {
//     console.log(bird)
//     Record.findById(req.params.recordId)
//     .populate('birds')
//     .then(record => {
//       record.birds.push(bird)
//       record.save()
//       .then(birds => {
//         res.render('birds/new', {
//           birds,
//           record,
//           title: 'Add Birds'
//         })
//       })    
//       .catch(err => {
//       console.log(err)
//       res.redirect('/')
//       })
//     })
//     .catch(err => {
//     console.log(err)
//     res.redirect('/')
//     })
//   })
// }


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

}

function detail(req, res) {
  
}

export{
  create,
  index,
  show,
  detail
}