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

function summElementsWorker(...arr) {
  if (!arr || arr.length === 0) {
    return 0;
  }
  
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arri;
  }
  
  return sum;
}

function differenceMaxMinWorker(...arr) {
  if (!arr || arr.length === 0) {
    return 0;
  }
  
  let max = arr0;
  let min = arr0;
  
  for (let i = 1; i < arr.length; i++) {
    if (arri > max) {
      max = arri;
    }
    
    if (arri < min) {
      min = arri;
    }
  }
  
  return max - min;
}

function differenceEvenOddWorker(...arr) {
  if (!arr || arr.length === 0) {
    return 0;
  }
  
  let sumEvenElement = 0;
  let sumOddElement = 0;
  
  for (let i = 0; i < arr.length; i++) {
    if (arri % 2 === 0) {
      sumEvenElement += arri;
    } else {
      sumOddElement += arri;
    }
  }
  
  return sumEvenElement - sumOddElement;
}

function averageEvenElementsWorker(...arr) {
  if (!arr || arr.length === 0) {
    return 0;
  }
  
  let sumEvenElement = 0;
  let countEvenElement = 0;
  
  for (let i = 0; i < arr.length; i++) {
    if (arri % 2 === 0) {
      sumEvenElement += arri;
      countEvenElement++;
    }
  }
  
  if (countEvenElement === 0) {
    return 0;
  }
  
  return sumEvenElement / countEvenElement;

}

function makeWork (arrOfArr, func) {
  let maxWorkerResult = -Infinity;

  for (let i = 0; i < arrOfArr.length; i++) {
    const result = func(...arrOfArri);
    
    if (result > maxWorkerResult) {
      maxWorkerResult = result;
    }
  }
  
  return maxWorkerResult;
}

