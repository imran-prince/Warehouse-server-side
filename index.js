const express = require('express');
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb')
const ObjectId = require('mongodb').ObjectId
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())

// dbpass:5WT1w6kjyfBySCMX
// dbname:imran
// server link: https://shielded-spire-43449.herokuapp.com/
const uri = `mongodb+srv://imran:5WT1w6kjyfBySCMX@cluster0.3s80f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
  try {
    await client.connect()
    const productCollection = client.db("imran").collection("computer");

    app.get('/allproduct', async (req, res) => {
      const q = req.query
      const cursor = productCollection.find({})
      const result = await cursor.toArray()
      res.send(result)
    })
    app.post('/productadd', async(req,res)=>{
       const newProduct=req.body;
       const result=await productCollection.insertOne(newProduct)
       res.send(result)
       console.log(result)
    })
    app.put('/product/:id', async (req, res) => {
        const id = req.params.id
        const updateProduct = req.body
        console.log(updateProduct.quantity);
        const filter = { _id: ObjectId(id) }
        const option = { upsert: true }
        const updatedoc = {
          $set: {
               quantity: updateProduct.quantity
          }
        }
        const result = await userColloectin.updateOne(filter, updatedoc, option)
        res.send(updateProduct.quantity)
        console.log(updateProduct.quantity);
      
  })
  app.delete('/product/:id',async(req,res)=>{
    const id =req.params.id
    const query={_id:ObjectId(id)}
    const result =await productCollection.deleteOne(query)
    res.send(result)
})
    // Delet User
    // app.delete('/product/:id', async (req, res) => {
    //   const id = req.params.id
    //   const query = { _id: ObjectId(id) }
    //   const result = await userColloectin.deleteOne(query)
    //   res.send(result)
    // })
    // update paticular
    app.get('/product/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await productCollection.findOne(query)
      res.send(result)
    })
    // // put method for updata
    app.put('/productupdate/:id', async (req, res) => {
      const id = req.params.id
      const updateProduct = req.body
      const filter = { _id: ObjectId(id) }
      const option = { upsert: true }
      const updatedoc = {
        $set: {
            name: updateProduct.name,
            email: updateProduct.email,
            price:updateProduct.price,
            quantity:updateProduct.quantity,
            suppliyer_name:updateProduct.suppliyer_name,
            description:updateProduct.description,
            img:updateProduct.img

           

        }
      }
      const result = await productCollection.updateOne(filter, updatedoc, option)
      res.send(result)

    })
    app.put('/productdecrease/:id', async (req, res) => {
      const id = req.params.id
      const updateQuantity = req.body
      const filter = { _id: ObjectId(id) }
      const option = { upsert: true }
      const updatedoc = {
        $set: {
             
            quantity:updateQuantity.quantity,
             

           

        }
      }
      const result = await productCollection.updateOne(filter, updatedoc, option)
      res.send(result)

    })




  }
  finally {

  }
}
run().catch(console.dir)


app.get('/', (req, res) => {
  res.send('computer accessories server test ok')
})
app.listen(port, () => {
  console.log("my port", port);
})