// const mongoose = require('mongoose');
// async function connect(){
//     try{
//         await mongoose.connect('mongodb://localhost:27017/f8_dev');
//         console.log("oke")
//     }catch(error){
//         console.log("0 oke")
//     }
// }
// module.exports ={connect}

const mongoose = require('mongoose')
const URL = 'mongodb+srv://vananz:mn112233@cluster0.shsiivx.mongodb.net/?retryWrites=true&w=majority'

async function connectDB(){
  try {
    await mongoose.connect(
      URL,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    console.log('Connected to mongoDB')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = {connectDB}

