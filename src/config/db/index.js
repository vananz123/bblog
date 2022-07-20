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
const { MongoClient, ServerApiVersion } = require('mongodb');
function connectdb(){
    try{
        const uri = "mongodb+srv://vananz:mn112233@cluster0.shsiivx.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        client.connect(err => {
            console.log('ko ket noi dc')
        client.close();
        });
       
    }catch{
        console.log("0 oke")
    }

}
module.exports ={connectdb}

