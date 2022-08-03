var express = require('express')
const Handlebars = require('handlebars')
var app = express()
var hbs = require('hbs')
var fs= require('fs')

app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

hbs.registerHelper('checkPriceGT200',(price)=>{
    return price > 200;
})

hbs.registerHelper('checkColor',(color, color1)=>{
    return color == color1;
})
hbs.registerHelper("mbold", function(options) {
    return new Handlebars.SafeString('<span style="color:blue">' + options.fn(this) + "</span>");
});

app.get('/',(req,res)=>{
    var name = "Q Q"
    var products = ["Vovol","Honda","Yamaha"]
    var products2 = [
        {
            name : 'cocacola',
            price: 120,
            onsale: false
        },
        {
            name : 'Coffee',
            price: 330,
            onsale : true
        }
    ]
    let content = fs.readFileSync('product.txt',"utf-8").trim()
    let products3 = []
    content.split('\n').forEach(element => {
        let p = {
            name: element.split(";")[0],
            color: element.split(";")[1],
            price: element.split(";")[2],
        }
        products3.push(p)
    });
    //truyen bien name vao trang home
    res.render('home',{'name':name,'products':products,'products2':products2
                                        ,'products3':products3})
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('Server is running!')
