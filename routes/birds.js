import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as birdsCtrl from '../controllers/birds.js'

const router = Router()

//GET /birds
router.get('/', isLoggedIn, birdsCtrl.index)
//GET /birds/:birdId
router.get('/:birdId', isLoggedIn, birdsCtrl.show)
//GET /birds/:birdId/records/:recordId
router.get('/:birdId/records/:recordId', isLoggedIn, birdsCtrl.detail)
//POST /birds/:recordId/add
router.post('/:recordId/new', isLoggedIn, birdsCtrl.create)

export {
  router
}