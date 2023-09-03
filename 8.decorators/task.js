//Задача № 1

import md5 from 'js-md5';

function cachingDecoratorNew(func) {
  let cache = [];

  function wrapper(...args) {
    const hash = md5(JSON.stringify(args)); 

    
    const objectInCache = cache.find((item) => item.hash === hash);

    if (objectInCache) { 
      console.log("Из кеша: " + objectInCache.value);
      return "Из кеша: " + objectInCache.value;
    }

    const result = func(...args); // Вычисляем результат
    cache.push({ hash, value: result }); // Добавляем результат в кеш

    if (cache.length > 5) {
      cache.shift(); 
    }

    console.log("Вычисляем: " + result);
    return "Вычисляем: " + result;
  }

  return wrapper;
}


const addAndMultiply = (a, b, c) => (a + b) * c;
const upgraded = cachingDecoratorNew(addAndMultiply);

console.log(upgraded(1, 2, 3)); // Вычисляем: 9
console.log(upgraded(1, 2, 3)); // Из кеша: 9
console.log(upgraded(2, 2, 3)); // Вычисляем: 12
console.log(upgraded(3, 2, 3)); // Вычисляем: 15
console.log(upgraded(4, 2, 3)); // Вычисляем: 18
console.log(upgraded(5, 2, 3)); // Вычисляем: 21
console.log(upgraded(6, 2, 3)); // Вычисляем: 24 (при этом кеш для 1, 2, 3 уничтожается)
console.log(upgraded(1, 2, 3)); // Вычисляем: 9 (снова вычисляем, кеша нет)


//Задача № 2
     
function debounceDecoratorNew(func, delay) {
  let timeoutId;
  let callCount = 0;

  const wrapper = function (...args) {
    callCount++;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (!timeoutId) {
      func.call(this, ...args);
      timeoutId = setTimeout(() => {
        timeoutId = null;
      }, delay);
    }
  };

  wrapper.count = 0;
  wrapper.allCount = 0;

  return wrapper;
}

const sendSignal = (signalOrder, delay) => console.log("Сигнал отправлен", signalOrder, delay);
const upgradedSendSignal = debounceDecoratorNew(sendSignal, 2000);

setTimeout(() => upgradedSendSignal(1, 0)); // Сигнал отправлен + будет запланирован асинхронный запуск, который будет проигнорирован, так как следующий сигнал отменит предыдущий (300 - 0 < 2000)
setTimeout(() => upgradedSendSignal(2, 300), 300); // проигнорировано, так как следующий сигнал отменит предыдущий (900 - 300 < 2000)
setTimeout(() => upgradedSendSignal(3, 900), 900); // проигнорировано, так как следующий сигнал отменит предыдущий (1200 - 900 < 2000)
setTimeout(() => upgradedSendSignal(4, 1200), 1200); // проигнорировано, так как следующий сигнал отменит предыдущий (2300 - 1200 < 2000)
setTimeout(() => upgradedSendSignal(5, 2300), 2300); // Сигнал отправлен, так как следующий вызов не успеет отменить текущий: 4400-2300=2100 (2100 > 2000)
setTimeout(() => upgradedSendSignal(6, 4400), 4400); // проигнорировано, так как следующий сигнал отменит предыдущий (4500 - 4400 < 2000)
setTimeout(() => upgradedSendSignal(7, 4500), 4500); // Сигнал будет отправлен, так как последний вызов debounce декоратора (спустя 4500 + 2000 = 6500) 6,5с

setTimeout(() => {
  console.log(upgradedSendSignal.count()); // было выполнено 3 отправки сигнала
  console.log(upgradedSendSignal.allCount()); // было выполнено 7 вызовов декорированной функции
}, 7000);