import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as birdsCtrl from '../controllers/birds.js'

const router = Router()

//GET /birds
router.get('/', isLoggedIn, birdsCtrl.index)
//GET /birds/new
router.get('/new', isLoggedIn, birdsCtrl.new)
//GET birds/:birdId
router.get('/:birdId', isLoggedIn, birdsCtrl.show)
//GET birds/:birdId/edit
router.get('/:birdId/edit', isLoggedIn, birdsCtrl.edit)
//GET /records/birdId/delete
router.get('/:birdId/delete', isLoggedIn, birdsCtrl.approveDelete)
//POST /birds
router.post('/', isLoggedIn, birdsCtrl.create)
//POST /birds/:birdId/instances
router.post('/:birdId/instances', isLoggedIn, birdsCtrl.addInstance)
//PUT /birds/:birdId
router.put('/:birdId', isLoggedIn, birdsCtrl.update)
//DELETE /birds/:birdId
router.delete('/:birdId', isLoggedIn, birdsCtrl.delete)

export {
  router
}