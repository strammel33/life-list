import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as recordsCtrl from '../controllers/records.js'

const router = Router()

//GET /records/new
router.get('/new', isLoggedIn, recordsCtrl.new)
//POST /records
router.post('/', isLoggedIn, recordsCtrl.create)


export {
  router
}
