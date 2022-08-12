const jwt =require('jsonwebtoken')
const Users =require('../app/models/Users')
class middleware{
    self(req,res,next){
        try{
            var token =req.session.checkLogin
            const iduser =jwt.verify(token,'mk')
            if(iduser){
                req.iduser =iduser
                next()
            }
       }catch{
            return res.redirect('/login')
       }
    }
    findUserCreate(req,res,next){
        try{
            Users.findById(req.iduser).lean()
            .then(userlogin =>{
                req.userlogin =userlogin
                next()
            })
            .catch(next =>next(err))
        }catch{
            res.json('user ko khop voi course')
        }
    }
    loginNext(req,res,next){
        try{
            var token =req.session.checkLogin
            const iduser =jwt.verify(token,'mk')
            if(iduser){
                req.iduser =iduser
                next()
            }
       }catch{
            next()
       }
    }
}
module.exports =new middleware