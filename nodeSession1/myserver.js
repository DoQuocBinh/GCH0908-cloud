var i
i = 50
// for(j=1;j<=10;j++){
//     console.log("i*j =" + i*j)
// }
// var msg = "Hello World"
// for(i=0;i<msg.length;i++){
//     console.log(msg[i].toUpperCase())
// }
// msg = "Happy new year!"
// //dung ham split
// mang = msg.split(" ")
// for(i=0;i<mang.length;i++){
//     console.log(mang[i])
// } 
var userInput ="Do Quang988 Anh8333"
var r = ''
for(i=0;i<userInput.length;i++){
    if(isNaN(userInput[i]) || userInput[i]===' '){
        r +=userInput[i]
    }
}
console.log(r)