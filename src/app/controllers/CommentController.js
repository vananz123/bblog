const Course = require('../models/Course')
const Users =require('../models/Users')
const jwt =require('jsonwebtoken')
const mongoose =require('mongoose')
const Comment =require('../models/Comment')
class CommentController {
    findUserCreateComment(req,res,next){
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
    //[post] /course/:id/comment
    index(req,res,next){
        
        const comment =new Comment({
            idcourse:req.params.id,
            iduser:req.userlogin._id,
            content:req.body.chat_text,
            email:req.userlogin.email,
            firstname:req.userlogin.firstname,
            lastname:req.userlogin.lastname
        })
        comment.save()
            .then(data=>res.redirect('back'))
            .catch(err=> res.json('that bai'))
    }
    replay(req,res,next){
        const fn =req.userlogin.firstname
        const ln =req.userlogin.lastname
        Comment.findOneAndUpdate({_id:req.params.idcomment},
            {$push: {replay: {"contentr": req.body.chat_text_r,"lastnamer":ln,"firstnamer":fn}}},
            {new: true, upsert: true }
        )
            .then(data=>res.redirect('back'))
            .catch(err=> res.json('that bai'))
    }

}
module.exports =new CommentController