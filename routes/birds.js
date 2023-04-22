import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as birdsCtrl from '../controllers/birds.js'

const router = Router()

//GET /birds
router.get('/', isLoggedIn, birdsCtrl.index)
//GET /birds/:birdId
router.get('/:birdId', isLoggedIn, birdsCtrl.show)
//POST /birds/:recordId/add
router.post('/:recordId/add', isLoggedIn, birdsCtrl.create)

export {
  router
}