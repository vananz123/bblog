const express = require('express')
const router = express.Router()
const usersController =require('../app/controllers/UsersController')
const multer  = require('multer')
const upload = require('../app/handlers/upload.multer')
router.post('/update/img',upload.single('img-profile'),usersController.findUser,usersController.updateImg)
router.post('/update',usersController.update)
router.get('/profile',usersController.profile)

module.exports =router