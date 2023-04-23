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
//GET /records/:recordId/addbirds
router.get('/:recordId/addbirds', isLoggedIn, recordsCtrl.addBirds)
//GET /records/recordId/delete
router.get('/:recordId/delete', isLoggedIn, recordsCtrl.approveDelete)
//GET /records/:recordId/edit
router.get('/:recordId/edit', isLoggedIn, recordsCtrl.edit)
//POST /records
router.post('/', isLoggedIn, recordsCtrl.create)
//PUT /records/:recordId
router.put('/:recordId', recordsCtrl.update)
//DELETE /records/:recordId
router.delete('/:recordId', isLoggedIn, tacosCtrl.delete)



export {
  router
}
