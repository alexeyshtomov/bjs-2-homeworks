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
    if (!arr || arr.length === 0) return 0;
  
    
    const sum = arr.reduce((acc, curr) => acc + curr, 0);
  
    return sum;
  }
 
  console.log(summElementsWorker());
  console.log(summElementsWorker(10, 10, 11, 20, 10));
 
  function differenceMaxMinWorker(arr) {
    if (!arr || arr.length === 0) return 0;
  
    let max = arr[0];
    let min = arr[0];
  
    for (let i = 1; i < arr.length; i++) {
      max = Math.max(max, arr[i]);
      min = Math.min(min, arr[i]);
    }
  
    return max - min;
  }
  console.log(differenceMaxMinWorker());
  console.log(differenceMaxMinWorker(10, 10, 11, 20, 10));
 
  function differenceEvenOddWorker(arr) {
    if (!arr || arr.length === 0) return 0;
  
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
  console.log(differenceEvenOddWorker(94, 51, 57, 41, 47, 66, 58, 10, 38, 17));
  console.log(differenceEvenOddWorker(15, 97, 85, 64, 67, 10, 69, 40, 15, 35));
 
  function averageEvenElementsWorker(arr) {
    if (!arr || arr.length === 0) return 0;
  
    let sumEvenElement = 0;
    let countEvenElement = 0;
  
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] % 2 === 0) {
        sumEvenElement += arr[i];
        countEvenElement += 1;
      }
    }
  
    if (countEvenElement === 0) return 0;
  
    return sumEvenElement / countEvenElement;
  }
  console.log(averageEvenElementsWorker(1, 2, 3, 4, 5, 6, 7, 8, 9));
  console.log(averageEvenElementsWorker(15, 97, 85, 64, 67, 10, 69, 40, 15, 35));

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

