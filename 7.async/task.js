class AlarmClock {
    constructor() {
        this.alarmCollection = [];
        this.intervalId = null;
    }

    addClock(time, callback, id) {
        if (!time || !callback) {
            throw new Error('Отсутствуют обязательные аргументы.');
        }

        if (this.alarmCollection.some(alarm => alarm.id === id)) {
            console.warn('Уже присутствует звонок с таким id.');
            return;
        }

        this.alarmCollection.push({time, callback, id, canCall: true});
    }

    removeClock(id) {
        const index = this.alarmCollection.findIndex(alarm => alarm.id === id);
        if (index !== -1) {
            this.alarmCollection.splice(index, 1);
            return true;
        }
        return false;
    }

    getCurrentFormattedTime() {
        const now = new Date();
        return now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    }

    start() {
        if (this.intervalId !== null) {
            return;
        }
        const checkAlarms = () => {
            const currentTime = this.getCurrentFormattedTime();
            this.alarmCollection.forEach(alarm => {
                if (alarm.time === currentTime && alarm.canCall === true) {
                    alarm.canCall = false;
                    alarm.callback();
                }
            });
        }
        checkAlarms();
        this.intervalId = setInterval(checkAlarms, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    resetAllCalls() {
        this.alarmCollection.forEach(alarm => alarm.canCall = true);
    }

    clearAlarms() {
        this.stop();
        this.alarmCollection = [];
    }
}
  