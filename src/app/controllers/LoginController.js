const Login=require('../models/Login')
const Users =require('../models/Users')
const jwt =require('jsonwebtoken')
class LoginController{
    //[GET] /login
    index(req,res,next){
        res.render('admin/login',{layout:false})
       
    }
    //[post] /login
    index1(req,res,next){
        Users.findOne({
            email:req.body.email,
            password:req.body.password
        }).lean()
            .then(data=>{
                if(data){
                    var token =jwt.sign({_id:data._id},'mk')
                    req.session.checkLogin =token
                    res.redirect('back')
                    res.end()
                    // return res.json({
                    //     mess:'thanh cong',
                    //     token:token
                    // })
                }
            })
            .catch(err=>{
                return res.json('loi chỗ này')
            })
       
    }
    logout(req,res,next){
        req.session.destroy()
        res.redirect('/')
    }
    
}
module.exports =new LoginController
