const fs = require('fs')

console.log("1")
// fs.readFile('data.txt','utf8',(loi,dulieu)=>{
//     if(loi){
//         console.log('Co loi roi!')
//         console.log(loi)
//         return
//     }
//     console.log('du lieu trong file:')
//     console.log(dulieu)
// })
var t = fs.readFileSync('data.txt','utf8')
t = t.split("\n")
for(let x of t) 
{
    console.log(x.toUpperCase())
}
console.log("2")