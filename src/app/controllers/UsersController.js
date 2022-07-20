const Users =require('../models/Users')
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
}
module.exports =new UsersController