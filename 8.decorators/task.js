function cachingDecoratorNew(func) {
  let cache = [];

  function wrapper(...args) {
    const hash = md5(JSON.stringify(args)); 
    let objectInCache = cache.find((item) => item.hash === hash);

    if (objectInCache) {
      console.log("Из кеша: " + objectInCache.value);
      return "Из кеша: " + objectInCache.value;
    }

    let result = func(...args);
    cache.push({ hash, value: result });

    if (cache.length > 5) {
      cache.shift(); 
    }

    console.log("Вычисляем: " + result);
    return "Вычисляем: " + result;
  }

  return wrapper;
}

const showCoords = (x, y) => console.log(`Клик:(${x}, ${y})`);

function decorator(f, ms){
  let timeout;

  return function (...args){
    clearTimeout(timeout);

    timeout = setTimeout(()=> {
      f.apply(this, args);
      console.timeEnd("time");
  }, ms);
}
}

const delayFunc = decotator(showCoords, 1000);
console.time("time");

setTimeout(() => delayedFunc(10,5));
setTimeout(() => delayedFunc(20,10) 980);
setTimeout(() => delayedFunc(30,30) 980);