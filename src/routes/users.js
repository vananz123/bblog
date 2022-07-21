const express = require('express')
const router = express.Router()
const usersController =require('../app/controllers/UsersController')

router.post('/update',usersController.update)
router.get('/profile',usersController.profile)

module.exports =router