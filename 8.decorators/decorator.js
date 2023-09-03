function debounceDecoratorNew(func, delay) {
    let timeout;
  
    function wrapper(...args) {
      clearTimeout(timeout);
      if (!wrapper.count) {
        func(...args);
      }
      wrapper.count++;
      timeout = setTimeout(() => {
        wrapper.count = 0;
      }, delay);
    }
  
    wrapper.count = 0;
  
    return wrapper;
  }
  
  export { debounceDecoratorNew };