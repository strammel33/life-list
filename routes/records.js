import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as recordsCtrl from '../controllers/records.js'

const router = Router()

//GET /records
router.get('/', isLoggedIn, recordsCtrl.index)
//GET /records/new
router.get('/new', isLoggedIn, recordsCtrl.new)
//GET /records/:recordId/addbirds
router.get('/:recordId/addbirds', isLoggedIn, recordsCtrl.addBirds)
//POST /records
router.post('/', isLoggedIn, recordsCtrl.create)



export {
  router
}
