import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as birdsCtrl from '../controllers/birds.js'

const router = Router()

//GET /birds
router.get('/', isLoggedIn, birdsCtrl.index)
//GET /birds/new
router.get('/new', isLoggedIn, birdsCtrl.new)
//POST /birds
router.post('/', isLoggedIn, birdsCtrl.create)

export {
  router
}