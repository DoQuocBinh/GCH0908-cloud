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
var myNumber = "155378231602517965"
//Tim nhung so > 5 va <8 va tinh tong cua nhung so nay
var s = 0
var myArray = []
for(i=0;i<myNumber.length;i++)
{
    let n = parseInt(myNumber[i])
    if ( 5 < n &&  n <8 ){
        myArray.push(n) // cho n vao mang
        s += n
    }
}
for(i=0;i<myArray.length;i++){
    console.log(myArray[i])
}
var m1 = [4,6,7,9,4,0,3,9,2]
var m2= [8,7,3,2,7,9,5,2]
var m = [...m1,...m2]//1. chua tat ca cac phan tu cua m1 va m2

//2. loai bo tat ca cac phan tu trung nhau trong m
m = [...new Set(m)]
console.log(m)

const check = (x)=>{
    return x > 20 && x <30;
}
m = [21,14,5,6,3,7,44,88,30,50,60]
m2 = m.filter(check)

console.log(m2)

const sum = (...x)=> 
{
    let s = 0
    for(let e of x){
        s = s + e
    }
    return s
}

console.log(sum(20,40,60,48))
