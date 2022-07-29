const exp = require('constants')
var express = require('express')
var app = express()
var fs = require('fs')

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

app.post('/register',(req,res)=>{
    let name = req.body.txtName
    let gender = req.body.gender
    let s = name + ';' + gender + '\n'
    fs.appendFileSync('data.txt',s,"utf8")
    res.end('hello ' + name + ';' + gender)
})

app.get('/',(req,res)=>{
    res.write('<html><body><h1>Home page</h1><img src="decor.png" width="400" height="400"/>')
    res.write('</body></html>')
    res.end()
})
app.get('/view',(req,res)=>{
    let content = fs.readFileSync('data.txt',"utf-8").trim()
    let ds = []
    content.split('\n').forEach(element => {
        let p = {
            name: element.split(";")[0],
            gender: element.split(";")[1],
        }
        ds.push(p)
    });
    res.write('<html><body><h1>Home page</h1><img src="decor.png" width="400" height="400"/>')
    res.write("<ul>")
    ds.forEach(element => {
        res.write("<li>" + element.name + "-" + element.gender + '</li>')
    });
    res.write("</ul>")
    res.write('</body></html>')
})

app.get('/student',(req,res)=>{
    res.sendFile(__dirname + "/public/student.html")
})

const PORT = process.env.PORT || 5000

app.listen(PORT)
console.log('Server is running!')