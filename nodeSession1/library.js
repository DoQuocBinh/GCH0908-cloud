const car = {
    brand: 'Vinfast',
    model: 'VF9',
  };

const sum = (...x)=> 
  {
      let s = 0
      for(let e of x){
          s = s + e
      }
      return s
  }
  
exports.car = car
exports.sum = sum
  