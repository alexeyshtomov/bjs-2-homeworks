 function getArrayParams(...arr) {
   let min = Infinity;
   let max = -Infinity;
   let sum = 0;

   for (let i = 0; i < arr.length; i++) {
    let num = arr[i];
     if (num > max) {
       max = num;
     }
     if (num < min) {
       min = num;
    }
     sum += num;
   }

   const avg = +(sum / arr.length).toFixed(2);

   return { max, min, avg }
}

  console.log(getArrayParams(1, 2, 3, 4, 5)); 
  console.log(getArrayParams(10, -5, 7, 12));

  function summElementsWorker(arr) {
    if (!arr || !arr.length) {
      return 0;
    }
  
    return arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }
  
  function differenceMaxMinWorker(arr) {
    if (!arr || !arr.length) {
      return 0;
    }
  
    let max = Math.max(...arr);
    let min = Math.min(...arr);
  
    return max - min;
  }
  
  function differenceEvenOddWorker(arr) {
    if (!arr || !arr.length) {
      return 0;
    }
  
    let sumEvenElement = 0;
    let sumOddElement = 0;
  
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] % 2 === 0) {
        sumEvenElement += arr[i];
      } else {
        sumOddElement += arr[i];
      }
    }
  
    return sumEvenElement - sumOddElement;
  }
  
  function averageEvenElementsWorker(arr) {
    if (!arr || !arr.length) {
      return 0;
    }
  
    let sumEvenElement = 0;
    let countEvenElement = 0;
  
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] % 2 === 0) {
        sumEvenElement += arr[i];
        countEvenElement++;
      }
    }
  
    return countEvenElement ? sumEvenElement / countEvenElement : 0;
  }
 
    
 