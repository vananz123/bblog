const Users =require('../models/Users')
const upload = require('../handlers/upload.multer') 
const cloudinary = require('cloudinary').v2
class UsersController{
    //[GET] 
    profile (req, res,next){
        res.render('user/profile')
    }
    //[get] /register
    register(req,res,next){
        res.render('admin/register',{layout:false})
    }
    //[post] /register
    checkUser(req,res,next){
        const email =req.body.email;
        Users.findOne({email:email}).lean()
            .then((data)=> {
                if(data){
                    return res.render('admin/register',{layout:false ,data})
                }else{
                    next()
                }
            })
            .catch((err)=>{
                return res.status(500).json('loi')
            } )
    }
    checkUser1(req,res,next){
        const formDataU =req.body
        const users =new Users(formDataU)
        users.save()
            .then(()=> res.redirect('/login'))
            .catch((error)=>{

            })
    }
    update(req,res,next){
        Users.updateOne({_id:req.iduser},req.body).lean()
            .then( ()=> res.redirect('/user/profile'))
            .catch(err=>{})
    }
    findUser(req,res,next){
    Users.findById(req.iduser).lean()
        .then(courses => {
            cloudinary.uploader.destroy(courses.img.slice(courses.img.lastIndexOf('/')+1,courses.img.length-4))
            next()
        } )
        .catch(next =>res.json('loi'))
    }

    //[put] user/update/img
    async updateImg(req,res,next){
        try{
            const result = await cloudinary.uploader.upload(req.file.path,
                {transformation: [
                  {gravity: "face", height: 400, width: 400, crop: "crop"},
                  {radius: "max"},
                  {width: 200, crop: "scale"}
                  ]
                })
            Users.findOneAndUpdate({_id:req.iduser},{img:result.secure_url} ).lean()
                .then(()=> res.redirect('/user/profile'))
                .catch((error)=>{

                })
        }catch{
            res.json('loi')
        }
    }
}
module.exports =new UsersController