const express = require('express');
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb')
const ObjetId = require('mongodb').ObjectId
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())

// dbpass:5WT1w6kjyfBySCMX
// dbname:imran

// const { MongoClient, ServerApiVersion } = require('mongodb');
 
 
 




 
const uri = `mongodb+srv://imran:5WT1w6kjyfBySCMX@cluster0.3s80f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
  
 
// });
async function run(){
  try{
    await client.connect()
    const collection = client.db("imran").collection("computer");
  
    app.get('/allproduct',async(req,res)=>{
      const q=req.query
      const cursor=collection.find({})
      const result=await cursor.toArray()
      res.send(result)
    })
   




  }
  finally{

  }
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('computer accessories server test ok')
})
app.listen(port, () => {
    console.log("my port", port);
})