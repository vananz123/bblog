const express = require('express')
const router = express.Router()
const courseController =require('../app/controllers/CourseController')
router.post('/:id/force',courseController.force)
router.post('/:id/restore',courseController.restore)
router.post('/:id/delete',courseController.delete)
router.get('/:id/edit',courseController.edit)
router.get('/create',courseController.create)
router.post('/store',courseController.store)

router.post('/:id',courseController.update)
router.get('/:slug',courseController.findUserCreate,courseController.show)
module.exports =router  