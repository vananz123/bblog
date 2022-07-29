const Course = require('../models/Course')
const Users =require('../models/Users')
const jwt =require('jsonwebtoken')
const upload = require('../handlers/upload.multer') 
const cloudinary = require('cloudinary').v2
const Comment =require('../models/Comment')
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
    showComment(req,res,next){
        try{
            Comment.find({idcourse:req.course._id}).lean()
            .then(data =>{
                req.comment =data
                next()
            })
            .catch(next =>next(err))
        }catch{
            res.json('lôi tìm comment')
        }
    }
    show(req,res,next){
        const course =req.course
        const comments= req.comment
        
        Users.findById(course.iduser).lean()
            .then(usermid => res.render('course/show',{course,usermid,comments}))
            .catch(next =>next(err))
    }
    showAll(req,res,next){
        let perPage = 4; // số lượng sản phẩm xuất hiện trên 1 page
        let page = req.params.page || 1; 
        Course.find({}).lean()
            .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
            .limit(perPage)
            .exec((err,courses)=>{
                Course.countDocuments((err, count) => { // đếm để tính có bao nhiêu trang
                    if (err) return next(err);
                    res.render('course/showall', {
                        courses, // sản phẩm trên một page
                        current: page, // page hiện tại
                        pages: Math.ceil(count / perPage) // tổng số các page
                    });
                  });
            })
    }
    create(req,res){
        res.render('course/create')
    }
    async store(req,res){
        var subjectInput=""
        const sub =["Thể thao","Văn hóa","Nghề nghiệp","Khác"]
        for(let i=0;i<sub.length;i++){
            if(parseInt(req.body.subject)-1==i){
                subjectInput = sub[i]
            }
        }
        try{
            const result =await cloudinary.uploader.upload(req.file.path) 
            const course =new Course({
                title:  req.body.title,
                body: req.body.body,
                subject:subjectInput,
                iduser:req.iduser,
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
                subject:subjectInput,
                iduser:req.iduser
            })
            course.save()
            .then(()=>{
                res.redirect('/')
            })
            .catch((error)=>{

            })
        }
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