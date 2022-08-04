const express = require('express')
const router = express.Router()
const courseController =require('../app/controllers/CourseController')
const commentController =require('../app/controllers/CommentController')
const interacController =require('../app/controllers/InteracController')
const multer  = require('multer')
const upload = require('../app/handlers/upload.multer')
const middleware =require('../utils/middleware')

router.post('/:idcomment/replay',middleware.findUserCreate,commentController.findComment,commentController.replay)
//interac
router.post('/:id/like',interacController.likeCount)
router.post('/:id/interacheart',interacController.heart)
router.post('/:id/comment',middleware.findUserCreate,commentController.index)
router.post('/:id/force',courseController.force)
router.post('/:id/restore',courseController.restore)
router.post('/:id/delete',courseController.delete)
router.post('/:id/updateimg',upload.single('imgurl'),courseController.findCourse,courseController.updateImg)
router.get('/:id/edit',courseController.edit)
router.get('/create',courseController.create)
router.post('/store',upload.single('imgurl'),middleware.findUserCreate,courseController.store)

router.post('/:id',courseController.update)

module.exports =router  