const Course = require('../models/Course')
const Users =require('../models/Users')
const jwt =require('jsonwebtoken')
const mongoose =require('mongoose')
const Comment =require('../models/Comment')
class CommentController {
    //[post] /course/:id/comment
    index(req,res,next){
        
        const comment =new Comment({
            idcourse:req.params.id,
            userId:req.userlogin,
            content:req.body.chat_text
        })
        comment.save()
            .then(data=>res.redirect('back'))
            .catch(err=> res.json('that bai'))
    }
    findComment(req,res,next){
        try{
            Comment.findById(req.params.idcomment).lean()
            .then(data =>{
                req.comment =data
                next()
            })
            .catch(next =>next(err))
        }catch{
            res.json('user ko khop voi course')
        }
    }
    //[post] /course/:id_comment/comment
    replay(req,res,next){
        Comment.findOneAndUpdate({_id:req.params.idcomment},
            {$push: {replay: {"content": req.body.chat_text_r,"userId":req.userlogin}}},{new: true, upsert: true }
        ).then(res.redirect('back'))
        .catch(next)
    }

}
module.exports =new CommentController