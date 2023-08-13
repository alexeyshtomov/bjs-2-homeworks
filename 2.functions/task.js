//  function getArrayParams(...arr) {
//    let min = Infinity;
//    let max = -Infinity;
//    let sum = 0;

//    for (let i = 0; i < arr.length; i++) {
//     let num = arr[i];
//      if (num > max) {
//        max = num;
//      }
//      if (num < min) {
//        min = num;
//     }
//      sum += num;
//    }

//    const avg = +(sum / arr.length).toFixed(2);

//    return { max, min, avg }
// }

//   console.log(getArrayParams(1, 2, 3, 4, 5)); 
//   console.log(getArrayParams(10, -5, 7, 12));

function summElementsWorker(...elements) {
  if (elements.length === 0) {
    return 0;
  } else {
    let sum = elements.reduce((acc, el) => acc + el);
    return sum;
  }
}

function differenceMaxMinWorker(...elements) {
  if (elements.length === 0) {
    return 0;
  } else {
    let max = Math.max(...elements);
    let min = Math.min(...elements);
    return max - min;
  }
}

function differenceEvenOddWorker(...elements) {
  let sumEvenElements = 0;
  let sumOddElements = 0;
  for (let el of elements) {
    if (el % 2 === 0) {
      sumEvenElements += el;
    } else {
      sumOddElements += el;
    }
  }
  return sumEvenElements - sumOddElements;
}

function averageEvenElementsWorker(...elements) {
  let sumEvenElements = 0;
  let countEvenElements = 0;
  for (let el of elements) {
    if (el % 2 === 0) {
      sumEvenElements += el;
      countEvenElements++;
    }
  }
  if (countEvenElements === 0) {
    return 0;
  } else {
    return sumEvenElements / countEvenElements;
  }
}

console.log(summElementsWorker()); // 0
console.log(summElementsWorker(10, 10, 11, 20, 10)); // 61

console.log(differenceMaxMinWorker()); // 0
console.log(differenceMaxMinWorker(10, 10, 11, 20, 10)); // 20 - 10 => 10

console.log(differenceEvenOddWorker(94, 51, 57, 41, 47, 66, 58, 10, 38, 17)); // 266 - 213 => 53
console.log(differenceEvenOddWorker(15, 97, 85, 64, 67, 10, 69, 40, 15, 35)); // 114 - 383 => -269

console.log(averageEvenElementsWorker(1, 2, 3, 4, 5, 6, 7, 8, 9)); // [2, 4, 6, 8] => 5
console.log(averageEvenElementsWorker(15, 97, 85, 64, 67, 10, 69, 40, 15, 35)); // [64, 10, 40] => 38

  // function makeWork(arrOfArr, func) {
  //   let maxWorkerResult = -Infinity;
  
  //   for (let i = 0; i < arrOfArr.length; i++) {
  //     const result = func(...arrOfArr[i]);
  
  //     if (result > maxWorkerResult) {
  //       maxWorkerResult = result;
  //     }
  //   }
  
  //   return maxWorkerResult;
  // }


    
 