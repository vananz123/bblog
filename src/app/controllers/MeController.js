const Course = require('../models/Course')
const jwt =require('jsonwebtoken')
class MeController {
    //[get] /me
    index(req,res,next){
      
        Course.find({iduser:req.iduser}).lean()
            .then(courses => res.render('me/me',{
                courses
            }))
            .catch(next =>next(err))
    }
    //[GET] /me/course/rubbish
    rubbish(req,res,next){
        Course.findDeleted().lean()
            .then( courses => res.render('me/rubbish',{
                courses
            }))
            .catch(next)
    }
    bookmart(req,res,next){
        Course.find({bookmart:{ $all: [req.iduser] }}).lean()
            .then( courses => res.json(courses))
            .catch(next)
    }

}
module.exports =new MeController