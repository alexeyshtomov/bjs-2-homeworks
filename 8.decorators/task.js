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
  let allCount = 0;

  const wrapper = function (...args) {
    allCount++;
    if (!timeoutId) {
      func.call(this, ...args);
      callCount++;
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      timeoutId = null;
    }, delay);
  };

  wrapper.count = () => callCount;
  wrapper.allCount = () => allCount;

  return wrapper;
}

export default debounceDecoratorNew;