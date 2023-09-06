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

function debounceDecoratorNew(func, delay) {
  let timeoutId;
  let count = 0;
  let allCount = 0;

  function wrapper(...args) {
    clearTimeout(timeoutId);

    if (!timeoutId) {
      
      const result = func(...args);
      count++;
      allCount++;
      wrapper.count = count; 
      wrapper.allCount = allCount; 
      return result;
    }

    return new Promise((resolve) => {
      timeoutId = setTimeout(() => {
        const result = func(...args);
        count++;
        allCount++;
        timeoutId = undefined;
        wrapper.count = count; 
        wrapper.allCount = allCount;
        console.log("Сигнал отправлен", args[0], args[1]);
        resolve(result);
      }, delay);
    });
  }

  return wrapper;
}
