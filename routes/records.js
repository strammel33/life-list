import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as recordsCtrl from '../controllers/records.js'


const router = Router()

//GET /records
router.get('/', isLoggedIn, recordsCtrl.index)
//GET /records/new
router.get('/new', isLoggedIn, recordsCtrl.new)
//GET /records/:recordId
router.get('/:recordId', isLoggedIn, recordsCtrl.show)
//GET /records/recordId/delete
router.get('/:recordId/delete', isLoggedIn, recordsCtrl.approveDelete)
//GET /records/:recordId/edit
router.get('/:recordId/edit', isLoggedIn, recordsCtrl.edit)
//POST /records
router.post('/', isLoggedIn, recordsCtrl.create)
//POST /records/:recordId/birds
router.post('/:recordId/birds', recordsCtrl.addToBirds)
//PUT /records/:recordId
router.put('/:recordId', isLoggedIn, recordsCtrl.update)
//DELETE /records/:recordId
router.delete('/:recordId', isLoggedIn, recordsCtrl.delete)
//DELETE /records/:recordId/birds/:birdId
router.delete('/:recordId/birds/:birdId', isLoggedIn, recordsCtrl.deleteBird)



export {
  router
}
