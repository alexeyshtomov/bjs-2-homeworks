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