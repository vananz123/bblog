
const mongoose =require('mongoose')
const slug = require('mongoose-slug-updater')
const mongoose_delete = require('mongoose-delete')

const Schema = mongoose.Schema;

const Course = new Schema({
  title:  { type: String },
  body:  { type: String},
  subject:  { type: String},
  img:{type:String, default:"https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2020/10/toi-nam-nay-hon-70-tuoi-1.jpg"},
  slug:{type:String ,slug:"title",slugOn:{updateOne:true}, unique:true},
  iduser: { type: String, default: ''}
},{
  timestamps:true,
});
//add plugin 
mongoose.plugin(slug)
Course.plugin(mongoose_delete,{ deletedAt : true , overrideMethods: 'all'})
module.exports =mongoose.model('courses', Course);