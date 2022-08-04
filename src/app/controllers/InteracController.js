const Course = require('../models/Course')
class InteracController {
    //[post ] /course/:id/like
    likeCount(req,res,next){
      Course.findOneAndUpdate({_id:req.params.id},{likeCount:req.body.likeCount})
        .then(data=>{
            
            res.json(data)
        })
        .catch(next)
    }
    //[post ] /course/:id/interacheart
    heart(req,res,next){
      const interac =new Interac({
        courseId:req.params.id,
        heart:req.userlogin
      })
      interac.save()
            .then(data=>res.redirect('back'))
            .catch(err=> res.json('that bai'))
    }

}
module.exports =new InteracController