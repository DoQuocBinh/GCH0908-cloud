var express = require('express')
var app = express()

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'

app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

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
    let product = {
        'name': name,
        'price': price
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