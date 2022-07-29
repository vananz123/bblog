const mongoose =require('mongoose')
const mongoose_delete = require('mongoose-delete')

const Schema = mongoose.Schema;
const CommentReplay =new Schema({
  content:{type:String},
  iduser:{type:String}
})
const Comment = new Schema({
    idcourse:{type:String},
    content:  { type: String},
    iduser: { type: String},
    email: { type: String },
    firstname: { type: String},
    lastname: { type: String},
    replay:{
      contentr:{type:String},
      firstnamer:{type:String},
      lastnamer:{type:String}
    }
},{
  timestamps:true,collection:'Comment'
});
//add plugin 
// Comment.plugin(mongoose_delete,{ deletedAt : true , overrideMethods: 'all'})
module.exports =mongoose.model('Comment', Comment);