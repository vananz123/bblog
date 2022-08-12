const Course = require('../models/Course')
const Users =require('../models/Users')
const jwt =require('jsonwebtoken')
const upload = require('../handlers/upload.multer') 
const cloudinary = require('cloudinary').v2
const Comment =require('../models/Comment')
class CourseController {
   
    async findUserCreate(req,res,next){
        try{
            const courses=await Course.findOne({ slug:req.params.slug}).lean().populate({path:'author' ,select:['img','firstname','lastname']})
            req.course =courses
            next()
        }catch{
            res.json('user ko khop voi course')
        }
    }
    async showComment(req,res,next){
        try{
            const comments =await Comment.find({idcourse:req.course._id}).lean()
            .populate({path:'userId'})
            .populate({path:'replay.userId'})
            req.comments =comments
            next()
        }catch{
            next()
        }
    }
     //[get] /course/:id/show
    show(req,res,next){
        const course =req.course
        const comments =req.comments
        const authorComment =req.iduser
        res.render('course/show',{course,comments,authorComment})
    }
    // showAll(req,res,next){
    //     let perPage = 4; // số lượng sản phẩm xuất hiện trên 1 page
    //     let page = req.params.page || 1; 
    //     Course.find({}).lean().populate({path:'author'})
    //         .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
    //         .limit(perPage)
    //         .exec((err,courses)=>{
    //             Course.countDocuments((err, count) => { // đếm để tính có bao nhiêu trang
    //                 if (err) return next(err);
    //                 res.render('course/showall', {
    //                     courses, // sản phẩm trên một page
    //                     current: page, // page hiện tại
    //                     pages: Math.ceil(count / perPage) // tổng số các page
    //                 });
    //               });
    //         })
    // }
    showAll(req,res,next){
        Course.find({}).lean().populate({path:'author'})
        .exec((err,courses)=>{
            res.json(courses)
        })
    }
    create(req,res){
        res.render('course/create')
    }
    async store(req,res){
        
        
        
        try{
            const result =await cloudinary.uploader.upload(req.file.path) 
            const course =new Course({
                title:  req.body.title,
                body: req.body.body,
               
                author:req.userlogin,
                img:result.secure_url 
            })
            course.save()
            .then(()=>{
                res.redirect('/')
            })
            .catch((error)=>{

            })
        }catch{
            const course =new Course({
                title:  req.body.title,
                body: req.body.body,
                
                author:req.userlogin
            })
            course.save()
            .then(()=>{
                res.redirect('/')
            })
            .catch((error)=>{

            })
        }
    }
    findCourse(req,res,next){
        Course.findById(req.params.id).lean()
            .then(courses => {
                cloudinary.uploader.destroy(courses.img.slice(courses.img.lastIndexOf('/')+1,courses.img.length-4))
                next()
            } )
            .catch(next =>res.json('loi'))
    }
    //[get] /course/:id/edit
    edit(req,res,next){
        
        Course.findById(req.params.id).lean()
            .then(courses => res.render('course/edit',{
                courses
            }))
            .catch(next =>next(err))
    }
    //[put] .course/:id/updateimg
    async updateImg(req,res,next){
        try{
            const result = await cloudinary.uploader.upload(req.file.path)
            Course.findOneAndUpdate({_id:req.params.id},{img:result.secure_url} ).lean()
                .then(()=> res.redirect('/me/course'))
                .catch((error)=>{

                })
        }catch{
            res.json('loi')
        }
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