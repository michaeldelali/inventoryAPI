// const mongoose = require('mongoose');
// const URI ="mongodb+srv://miqi:123456789w@cluster0.habve.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const connectDB = async()=>{
//     await mongoose.connect(URI,{useUnifiedTopology:true , useNewUrlParser: true})
//     console.log("connected.....!")
// }
// module.exports=connectDB;

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://miqi:123456789w@cluster0.habve.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const mongoose = require('mongoose')


// const url = `mongodb+srv://miqi:123456789w@cluster0.habve.mongodb.net/inventory?retryWrites=true&w=majority`;

const url = `mongodb://127.0.0.1:27017/inventory`;

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
const connectDB = async()=>{
    await mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })
}
module.exports= connectDB;