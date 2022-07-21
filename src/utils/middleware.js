const jwt =require('jsonwebtoken')
const Users =require('../app/models/Users')
class middleware{
    self(req,res,next){
        try{
            var token =req.session.checkLogin
            const iduser =jwt.verify(token,'mk')
            if(iduser){
                req.iduser =iduser;
                next()
            }
       }catch{
            return res.redirect('/login')
       }
    }
}
module.exports =new middleware