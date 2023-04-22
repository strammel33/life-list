import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as birdsCtrl from '../controllers/birds.js'

const router = Router()

//POST
router.post('/:recordId/add', isLoggedIn, birdsCtrl.create)

export {
  router
}