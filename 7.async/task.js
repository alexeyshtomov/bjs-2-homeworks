class AlarmClock {
  constructor() {
    this.alarmCollection = {};
    this.intervalId = null;
  }

  addClock(time, callback) {
    if (!time || !callback) {
      throw new Error('Отсутствуют обязательные аргументы');
    }

    if (!this.alarmCollection[time]) {
      this.alarmCollection[time] = [];
    }

    this.alarmCollection[time].push({ callback, canCall: true });
  }

  removeClock(time) {
    if (this.alarmCollection[time]) {
      delete this.alarmCollection[time];
    }
  }

  getCurrentFormattedTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  start() {
    if (this.intervalId !== null) {
      return;
    }

    this.intervalId = setInterval(() => {
      const currentTime = this.getCurrentFormattedTime();
      const alarms = this.alarmCollection[currentTime];

      if (alarms) {
        alarms.forEach(alarm => {
          if (alarm.canCall) {
            alarm.canCall = false;
            alarm.callback();
          }
        });
      }
    }, 1000);
  }

  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  resetAllCalls() {
    for (const time in this.alarmCollection) {
      if (this.alarmCollection.hasOwnProperty(time)) {
        const alarms = this.alarmCollection[time];
        alarms.forEach(alarm => {
          alarm.canCall = true;
        });
      }
    }
  }

  clearAlarms() {
    this.stop();
    this.alarmCollection = {};
  }
}

