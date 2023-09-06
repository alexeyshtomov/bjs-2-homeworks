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
    if (!timeoutId) {
      
      const result = func(...args);
      count++;
      allCount++;
      wrapper.count = count; 
      wrapper.allCount = allCount; 
      return result;
    }

    return new Promise((resolve) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        const result = await func(...args);
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

const sendSignal = async (signalOrder, delay) => {
  console.log("Сигнал отправлен", signalOrder, delay);
  return `Сигнал отправлен ${signalOrder} ${delay}`;
};

const upgradedSendSignal = debounceDecoratorNew(sendSignal, 2000);

setTimeout(async () => {
  console.log(await upgradedSendSignal(1, 0)); // Сигнал отправлен
}, 0);

setTimeout(async () => {
  console.log(await upgradedSendSignal(2, 300)); // проигнорировано
}, 300);

setTimeout(async () => {
  console.log(await upgradedSendSignal(3, 900)); // проигнорировано
}, 900);

setTimeout(async () => {
  console.log(await upgradedSendSignal(4, 1200)); // проигнорировано
}, 1200);

setTimeout(async () => {
  console.log(await upgradedSendSignal(5, 2300)); // Сигнал отправлен
}, 2300);

setTimeout(async () => {
  console.log(await upgradedSendSignal(6, 4400)); // проигнорировано
}, 4400);

setTimeout(async () => {
  console.log(await upgradedSendSignal(7, 4500)); // Сигнал будет отправлен
}, 4500);

setTimeout(() => {
  console.log(upgradedSendSignal.count); // было выполнено 3 отправки сигнала
  console.log(upgradedSendSignal.allCount); // было выполнено 7 вызовов декорированной функции
}, 7000);