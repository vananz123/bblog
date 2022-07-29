const Course = require('../models/Course')
const Users =require('../models/Users')
const jwt =require('jsonwebtoken')
class SiteController {
    //[get] /
    index(req,res,next){
        Course.find({}).lean()
            .then(courses =>{
                res.render('home',{courses})
            })
            .catch(next =>next(err))
    }
    //[get] /search
    search(req,res){
        res.render('search')
    }
}
module.exports =new SiteController
