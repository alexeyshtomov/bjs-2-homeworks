"use strict"
function solveEquation(a, b, c) {
  let arr = [];
  let D = b ** 2 - 4 * a * c;
  let x1, x2;
  if (D < 0) {
    return arr;
  } else if (D === 0) {
    x1 = -b / (2 * a);
    arr.push(x1);
  } else {
    x1 = (-b + Math.sqrt(D)) / (2 * a);
    x2 = (-b - Math.sqrt(D)) / (2 * a);
    arr.push(x1, x2);
  }
  return arr;
}
  
function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  if (typeof(percent) != "number" || typeof(contribution) != "number" || typeof(amount) != "number" || typeof(countMonths) != "number") {
    return "Параметр содержит неправильное значение";
  }
  
  let S = amount - contribution;
  let P = percent / 100 / 12;
  let payment = S * (P + P / (((1 + P) ** countMonths) - 1));
  let totalAmount = payment * countMonths;
}