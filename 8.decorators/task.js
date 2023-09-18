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

function debounceDecoratorNew(f, ms) {
  let timeout;
  let called = false;
  let callCount = 0;
  let totalCount = 0;

  const debounced = function (...args) {
    totalCount++;
    clearTimeout(timeout);

    if (!called) {
      f(...args);
      called = true;
      callCount++;
    }

    timeout = setTimeout(() => {
      timeout = null;
      called = false;
    }, ms);
  };

  debounced.count = () => callCount;
  debounced.allCount = () => totalCount;

  return debounced;
}


const showCoords = (x, y) => console.log(`Клик:(${x}, ${y})`);

const debouncedShowCoords = debounceDecoratorNew(showCoords, 1000);

console.time("time");

setTimeout(() => debouncedShowCoords(10, 5), 980);
setTimeout(() => debouncedShowCoords(20, 10), 980);
setTimeout(() => debouncedShowCoords(30, 30), 980);

setTimeout(() => {
  console.log(`Вызвано: ${debouncedShowCoords.count} раз`);
}, 2000);



