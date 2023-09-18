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
  let counter = {
    allCount: 0,
    count: 0,
  };

  let debounced = function (...args) {
    counter.allCount++;

    if (!timeout) {
      f(...args);
      counter.count++;
    }

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      timeout = null;
      if (counter.allCount > 1) {
        f(...args);
        counter.count++;
      }
    }, ms);
  };

  debounced.counter = counter;

  return debounced;
}

const showCoords = (x, y) => console.log(`Клик: (${x}, ${y})`);

const debouncedShowCoords = debounceDecoratorNew(showCoords, 1000);

console.time("time");

setTimeout(() => debouncedShowCoords(10, 5), 1100);
setTimeout(() => debouncedShowCoords(20, 10), 1100);
setTimeout(() => debouncedShowCoords(30, 30), 1100);

setTimeout(() => {
  console.log(`Вызвано: ${debouncedShowCoords.counter.count} раз`);
}, 2000);