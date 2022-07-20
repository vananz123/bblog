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
async function connect(){
    try{
        const { MongoClient, ServerApiVersion } = require('mongodb');
        const uri = process.env.MONGODB_URI;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        client.connect(err => {
        const collection = client.db("test").collection("devices");
        // perform actions on the collection object
        client.close();
        });
        console.log("oke")
    }catch{
        console.log("0 oke")
    }

}
module.exports ={connect}

