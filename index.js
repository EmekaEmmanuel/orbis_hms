const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const cors = require('cors')

 const app = express()

 const routes   = require('./routes/route_index')

 const URL = "mongodb://localhost:27017/orbis";
 const PORT = 5002;

 mongoose.connect(URL, {useNewUrlParser:true, useUnifiedTopology:true})
 mongoose.connection.on('open', ()=>console.log('Mongodb Connected'))
 mongoose.connection.on('error', (e)=>console.log(e))

 app.use(cors())
 app.use(express.json())
 app.use(express.urlencoded({extended:true}))

 app.use(routes)

 app.get("/",function(req,res){
	res.send({"msg":"Our Api record"})
})


app.listen(PORT)
console.log("Running on http://localhost:"+PORT)