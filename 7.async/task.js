class AlarmClock {
    constructor() {
      this.alarmCollection = [];
      this.timerId = null;
    }
  
    addClock(time, callback, id) {
      if (!id) {
        throw new Error("Id не передан");
      }
  
      if (this.alarmCollection.some(alarm => alarm.id === id)) {
        console.error(`Будильник с id ${id} уже существует`);
        return;
      }
  
      this.alarmCollection.push({ id, time, callback });
    }
  
    removeClock(id) {
      const initialLength = this.alarmCollection.length;
      this.alarmCollection = this.alarmCollection.filter(alarm => alarm.id !== id);
      return initialLength !== this.alarmCollection.length;
    }
  
    getCurrentFormattedTime() {
      return new Date().toLocaleTimeString().slice(0, -3);
    }
  
    start() {
      const checkClock = (alarm) => {
        if (this.getCurrentFormattedTime() === alarm.time) {
          alarm.callback();
        }
      };
  
      if (!this.timerId) {
        this.timerId = setInterval(() => {
          this.alarmCollection.forEach(checkClock);
        }, 1000);
      }
    }
  
    stop() {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
    }
  
    printAlarms() {
      console.log("Все будильники:");
      this.alarmCollection.forEach(alarm => {
        console.log(`Будильник ${alarm.id} заведён на ${alarm.time}`);
      });
    }
  
    clearAlarms() {
      this.stop();
      this.alarmCollection = [];
    }
  }
  