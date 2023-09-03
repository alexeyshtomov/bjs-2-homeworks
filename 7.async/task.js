class AlarmClock {
  constructor() {
    this.alarmCollection = [];
    this.intervalId = null;
  }

  addClock(time, callback) {
    if (!time || !callback) {
      throw new Error('Отсутствуют обязательные аргументы');
    }

    if (this.alarmCollection.some(alarm => alarm.time === time)) {
      console.warn('Уже присутствует звонок на это же время');
    } else {
      this.alarmCollection.push({ time, callback, canCall: true });
    }
  }

  removeClock(time) {
    this.alarmCollection = this.alarmCollection.filter(alarm => alarm.time !== time);
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
      this.alarmCollection.forEach(alarm => {
        if (alarm.time === currentTime && alarm.canCall) {
          alarm.canCall = false;
          alarm.callback();
        }
      });
    }, 1000);
  }

  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  resetAllCalls() {
    this.alarmCollection.forEach(alarm => {
      alarm.canCall = true;
    });
  }

  clearAlarms() {
    this.stop();
    this.alarmCollection = [];
    this.resetAllCalls(); 
  }
}


const alarmClock = new AlarmClock();

describe("AlarmClock", function() {
  let alarmClock;

  beforeEach(function() {
    alarmClock = new AlarmClock();
  });

  it("should clear all alarms", function() {
    alarmClock.addClock("08:00", () => {
      console.log("Пора вставать!");
      alarmClock.removeClock("08:00");
    });

    alarmClock.addClock("08:01", () => {
      console.log("Ещё один звонок!");
      alarmClock.stop();
      alarmClock.clearAlarms();
    });

    expect(alarmClock.alarmCollection.length).toBe(2);

    alarmClock.clearAlarms();
    expect(alarmClock.alarmCollection.length).toBe(0);
  });
});