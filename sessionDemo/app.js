var express = require('express')
var app = express()
var session = require('express-session')
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));


app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

app.post('/login', async (req,res)=>{
    let name = req.body.txtName
    let pass = req.body.txtPass

    let client= await MongoClient.connect(url);
    let dbo = client.db("ProductDB");
    const user = await dbo.collection("users").findOne({'name' :name,'password': pass})
    if(user !=null){
        console.log(`Name : ${user.name} Role: ${user.role}`)
        var session=req.session
        session.user = user
        res.redirect('/')
    }else{
        res.redirect('/login')
    }

})
app.get('/login', (req,res)=>{
    res.render('login')
})

app.post('/register',async (req,res)=>{
    let name = req.body.txtName
    let pass = req.body.txtPass
    let role = req.body.role
    let user = {
        'name': name,
        'password': pass,
        'role': role
    }
    let client= await MongoClient.connect(url);
    let dbo = client.db("ProductDB");
    await dbo.collection("users").insertOne(user)
    res.redirect('/')
})

app.get('/',(req,res)=>{
    const session = req.session
    const user = session.user
    res.render('home',{'user': user})
})

app.get('/register',(req,res)=>{
    res.render('register')
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('Server is running!')