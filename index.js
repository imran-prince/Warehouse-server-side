const express = require('express');
const app=express()
const cors=require('cors')
const {MongoClient,ServerApiVersion}=require('mongodb')
const ObjetId=require('mongodb').ObjectId
const port =process.env.PORT || 5000
app.use(cors())
app.use(express.json())


app.get('/',(req,res)=>{
    res.send('computer accessories server test')
})
app.listen(port,()=>{
    console.log("my port",port);
})