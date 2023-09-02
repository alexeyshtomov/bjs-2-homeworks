class AlarmClock {
    constructor() {
      this.alarmCollection = [];
      this.intervalId = null;
    }
  
    addClock(time, callback, id) {
      if (!time || !callback || !id) {
          throw new Error('Отсутствуют обязательные аргументы');
      }
      if (this.alarmCollection.some((alarm) => alarm.id === id)) {
        console.warn('Уже присутствует звонок с таким id');
        return;
      }
      this.alarmCollection.push({ id, time, callback, canCall: true });
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
          if (alarm.time === this.getCurrentFormattedTime() && alarm.canCall) {
            alarm.canCall = false;
            alarm.callback();
            this.removeClock(alarm.id); // Удаляем звонок после выполнения
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
      this.alarmCollection.forEach((alarm) => {
        alarm.canCall = true;
      });
    }
  
    clearAlarms() {
      this.stop();
      this.alarmCollection = [];
    }
  }
  
  const alarmClock = new AlarmClock();
  
  alarmClock.addClock('08:00', () => console.log('Wake up!'), 1);
  alarmClock.addClock('12:00', () => console.log('Lunch time!'), 2);
  alarmClock.addClock('18:00', () => console.log('Dinner time!'), 3);
  alarmClock.start(); 
  setTimeout(() => alarmClock.stop(), 5000); 
  setTimeout(() => alarmClock.clearAlarms(), 15000); 