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
  let debouncedCount = 0;
  let allCount = 0;

  const debounced = function (...args) {
    allCount++;

    clearTimeout(timeout);

    if (!timeout || allCount === 1) {
      debouncedCount++; // Увеличиваем счетчик только если таймер еще не был установлен или это первый вызов
    }

    timeout = setTimeout(() => {
      timeout = null;
      f(...args);
    }, ms);
  };

  debounced.count = () => debouncedCount;
  debounced.allCount = () => allCount;

  return debounced;
}


