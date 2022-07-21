const Course = require('../models/Course')
const Users =require('../models/Users')
const jwt =require('jsonwebtoken')
const upload = require('../handlers/upload.multer') 
const cloudinary = require('cloudinary').v2
class CourseController {
    //[get] /course/:id/show
    findUserCreate(req,res,next){
        try{
            Course.findOne({ slug:req.params.slug}).lean()
            .then(courses =>{
                req.course =courses
                next()
            })
            .catch(next =>next(err))
        }catch{
            res.json('user ko khop voi course')
        }
    }
    show(req,res,next){
        const courses =req.course
        Users.findById(courses.iduser).lean()
            .then(usermid => res.render('course/show',{courses,usermid}))
            .catch(next =>next(err))
    }
    create(req,res){
        res.render('course/create')
    }
    async store(req,res){
        const result =await cloudinary.uploader.upload(req.file.path) 
        const course =new Course({
            title:  req.body.title,
            body: req.body.body,
            subject:req.body.subject,
            iduser:req.iduser,
            img:result.secure_url 
        })
        course.save()
            .then(()=>{
                console.log(req.file)
                console.log(result.secure_url)
                res.redirect('/')
            })
            .catch((error)=>{

            })
    }
    //[get] /course/:id/edit
    edit(req,res,next){
        
        Course.findById(req.params.id).lean()
            .then(courses => res.render('course/edit',{
                courses
            }))
            .catch(next =>next(err))
    }
    //[put] /course/:id
    update(req,res,next){
        Course.updateOne({_id:req.params.id}, req.body ).lean()
            .then(()=> res.redirect('/me/course'))
            .catch((error)=>{

            })
    }
    delete(req,res,next){
        Course.delete({_id:req.params.id}).lean()
            .then(res.redirect('back'))
            .catch(next)
    }
    restore(req,res,next){
        Course.restore({_id:req.params.id}).lean()
            .then(res.redirect('back'))
            .catch(next)
    }
    force(req,res,next){
        Course.deleteOne({_id:req.params.id}).lean()
            .then(res.redirect('back'))
            .catch(next)
    }
}
module.exports =new CourseController