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
    userId:{
      type:mongoose.Schema.Types.ObjectId, ref: 'users'
    },
    replay:{
      content:{type:String},
      userId:{
      type:mongoose.Schema.Types.ObjectId, ref: 'users'
      }
    }
},{
  timestamps:true,collection:'comment'
});
//add plugin 
// Comment.plugin(mongoose_delete,{ deletedAt : true , overrideMethods: 'all'})
module.exports =mongoose.model('comment', Comment);