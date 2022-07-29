const express = require('express')
const router = express.Router()
const courseController =require('../app/controllers/CourseController')
const commentController =require('../app/controllers/CommentController')
const multer  = require('multer')
const upload = require('../app/handlers/upload.multer')
router.post('/:id/:idcomment/replay',commentController.findUserCreateComment,commentController.replay)
router.post('/:id/comment',commentController.findUserCreateComment,commentController.index)
router.post('/:id/force',courseController.force)
router.post('/:id/restore',courseController.restore)
router.post('/:id/delete',courseController.delete)
router.get('/:id/edit',courseController.edit)
router.get('/create',courseController.create)
router.post('/store',upload.single('imgurl'),courseController.store)

router.post('/:id',courseController.update)

module.exports =router  