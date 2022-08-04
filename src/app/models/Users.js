const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
    email: { type: String, default: '' ,unique:true},
    password: { type: String, default: ''},
    phone: { type: String, default: ''},
    firstname: { type: String, default: ''},
    lastname: { type: String, default: ''},
    img:{type:String,default:'/img/userde.png'},
    roles: {type: Array, default: []},  
    status: { type: String, default: 'noactive'},
    type_regis: { type: String, default: 'WE'},

    deleteAt: { type: Date, default: Date.now},
    createAt: { type: Date, default: Date.now},
    updateAt: { type: Date, default: Date.now},
    action: { type: String, default: 'System'},
    
}, { collection: 'users' })

Users.index({ email: 1}) //Nơi đánh index
module.exports = mongoose.model('users', Users)