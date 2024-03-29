var express = require('express')
const {  ObjectId } = require('mongodb')
var app = express()

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'
//var url = "mongodb://tommy:123456789mu@cluster0-shard-00-00.lkrga.mongodb.net:27017,cluster0-shard-00-01.lkrga.mongodb.net:27017,cluster0-shard-00-02.lkrga.mongodb.net:27017/test?replicaSet=Cluster0-shard-0&ssl=true&authSource=admin"

app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

app.post('/update',async (req,res)=>{
    let id = req.body.id
    let objectId = ObjectId(id)
    let name = req.body.txtName
    let price = Number(req.body.txtPrice) 
    let picURL = req.body.txtPic
    let product = {
        'name': name,
        'price': price,
        'picture': picURL
    }
    let client= await MongoClient.connect(url);
    let dbo = client.db("ProductDB");
    await dbo.collection("shopeeProduct").updateOne({_id:objectId},{$set : product})
    res.redirect('/')
})

app.get('/edit',async (req,res)=>{
    let id = req.query.id
    let objectId = ObjectId(id)
    let client= await MongoClient.connect(url);
    let dbo = client.db("ProductDB");
    let prod = await dbo.collection("shopeeProduct").findOne({_id:objectId})
    console.log(prod)
    res.render('edit',{'prod':prod})
})

app.get('/delete',async (req,res)=>{
    let id = req.query.id
    console.log(id)
    let objectId = ObjectId(id)
    let client= await MongoClient.connect(url);
    let dbo = client.db("ProductDB");
    //For substring search, case insensitive
    await dbo.collection("shopeeProduct").deleteOne({_id:objectId})
    res.redirect('/')
})

app.post('/search', async (req,res)=>{
    let name = req.body.txtSearch
    let client= await MongoClient.connect(url);
    let dbo = client.db("ProductDB");
    //For substring search, case insensitive
    let prods = await dbo.collection("shopeeProduct").
            find({'name':new RegExp(name, 'i')}).toArray()
    console.log(prods)
    res.render('viewProducts',{'prods': prods})
})

app.get('/view',async (req,res)=>{
    let client= await MongoClient.connect(url);
    let dbo = client.db("ProductDB");
    let prods = await dbo.collection("shopeeProduct").find().toArray()
    console.log(prods)
    
    res.render('viewProducts',{'prods': prods})
})

app.post('/insertProduct',async (req,res)=>{
    let name = req.body.txtName
    let price = Number(req.body.txtPrice) 
    let picURL = req.body.txtPic
    let product = {
        'name': name,
        'price': price,
        'picture': picURL
    }
    let client= await MongoClient.connect(url);
    let dbo = client.db("ProductDB");
    await dbo.collection("shopeeProduct").insertOne(product)
    res.redirect('/')

})

app.get('/new',(req,res)=>{
    res.render('newProduct')
})

app.get('/',(req,res)=>{
    res.render('home')
})

const PORT = process.env.PORT || 5000

app.listen(PORT)
console.log("Server is running!")