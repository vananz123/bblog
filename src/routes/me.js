const express = require('express')
const router = express.Router()
const meController =require('../app/controllers/MeController')
const middleware =require('../utils/middleware')
router.get('/course/bookmart',middleware.findUserCreate,meController.bookmart)
router.get('/course/rubbish',meController.rubbish)
router.get('/course',meController.index)

module.exports =router