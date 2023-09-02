class AlarmClock {
    constructor() {
      this.alarmCollection = [];
      this.intervalId = null;
    }
  
    addClock(time, callback, id) {
      if (typeof time === 'undefined' || typeof callback === 'undefined' || typeof id === 'undefined') {
        throw new Error('Отсутствуют обязательные аргументы');
      }
      if (this.alarmCollection.some((alarm) => alarm.id === id)) {
        console.warn('Уже присутствует звонок с таким id');
        return;
      }
      this.alarmCollection.push({ id, time, callback });
    }
  
    removeClock(id) {
      const index = this.alarmCollection.findIndex((alarm) => alarm.id === id);
      if (index !== -1) {
        this.alarmCollection.splice(index, 1);
        return true;
      }
      return false;
    }
  
    getCurrentFormattedTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
  
    start() {
      if (this.intervalId) {
        return;
      }
      this.intervalId = setInterval(() => {
        this.alarmCollection.forEach((alarm) => {
          if (alarm.time === this.getCurrentFormattedTime()) {
            alarm.callback();
          }
        });
        this.resetAllCalls();
      }, 1000);
    }
  
    stop() {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  
    resetAllCalls() {
      const currentTime = this.getCurrentFormattedTime();
      this.alarmCollection = this.alarmCollection.filter((alarm) => alarm.time >= currentTime);
    }
  
    clearAlarms() {
      this.stop();
      this.alarmCollection = [];
    }
  }