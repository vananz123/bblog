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

const mongoAtlasUri = "mongodb+srv://vananz:<password>@cluster0.shsiivx.mongodb.net/?retryWrites=true&w=majority";
async function connect(){
    try {
        // Connect to the MongoDB cluster
        mongoose.connect(
            mongoAtlasUri,
            { useNewUrlParser: true, useUnifiedTopology: true },
            () => console.log(" Mongoose blog mindx is connected")
        );
    } catch (e) {
        console.log("could not connect");
    }
}
module.exports ={connect}
