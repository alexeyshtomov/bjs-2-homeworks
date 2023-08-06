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
  
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
  
    return sum;
  }
    const arr = [1, 2, 3, 4, 5];
    const sum = summElementsWorker(arr);

    console.log(sum);  