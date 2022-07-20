const mongoose = require('mongoose');
async function connect(){
    try{
        await mongoose.connect('mongodb://localhost:27017/f8_dev');
        console.log("oke")
    }catch(error){
        console.log("0 oke")
    }
}
module.exports ={connect}