describe('Домашнее задание к лекции 7 «Асинхронность»', () => {
  let clock;

  beforeEach(() => {
    clock = new AlarmClock();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;
  });

  it('должен создавать объект будильник', () => {
    expect(clock).toBeTruthy();
  });

  it('должен добавлять звонок', () => {
    const callback = () => {};
    clock.addClock('16:45', callback);
    expect(clock.alarmCollection.length).toEqual(1);
    expect(clock.alarmCollection[0].canCall).toBe(true);
    expect(clock.alarmCollection[0].time).toBe('16:45');
    expect(clock.alarmCollection[0].callback).toBe(callback);
  });

  it('id интервала должно отсутствовать до запуска', () => {
    expect(clock.intervalId).toBeNull();
  });

  it('должен запускать и останавливать будильник', () => {
    clock.addClock('16:45', () => {});
    clock.start();
    expect(clock.intervalId).toBeDefined();
    clock.stop();
  });

  it('должен возвращать время в формате HH:MM', () => {
    expect(clock.getCurrentFormattedTime()).toEqual(new Date().toLocaleTimeString('ru-Ru', {
      hour: '2-digit',
      minute: '2-digit',
    }));
  });

  it('должен создавать интервал и затем его удалять', () => {
    clock.start();
    expect(clock.intervalId).toBeDefined();
    clock.stop();
    expect(clock.intervalId).toBeNull();
  });

  it('не должен создавать несколько интервалов', () => {
    clock.start();
    const intervalId = clock.intervalId;
    clock.start();
    expect(intervalId).toEqual(clock.intervalId);
  });

  it('должен удалять звонки по времени', () => {
    const callback = () => {};
    clock.addClock('16:45', callback);
    clock.addClock('16:45', callback);
    clock.addClock('16:46', callback);
    clock.removeClock('16:45');
    expect(clock.alarmCollection.length).toEqual(1);
    expect(clock.alarmCollection).toEqual([{ time: '16:46', callback, canCall: true }]);
  });

  it('не должен удалять звонки по отсутствующему времени', () => {
    const callback = () => {};
    clock.addClock('16:46', callback);
    clock.removeClock('17:00');
    expect(clock.alarmCollection.length).toEqual(1);
    expect(clock.alarmCollection).toEqual([{ time: '16:46', callback, canCall: true }]);
  });

  it('должен затем очищать все звонки', () => {
    clock.addClock('16:45', () => {});
    clock.addClock('16:45', () => {});
    clock.addClock('16:45', () => {});
    expect(clock.alarmCollection.length).toEqual(3);

    clock.clearAlarms();
    expect(clock.alarmCollection.length).toEqual(0);
  });

  it('должен выбрасывать объект ошибки, если время не было передано', () => {
    expect(() => clock.addClock(null, () => {})).toThrow();
  });

  it('должен выбрасывать объект ошибки, если колбек не был передан', () => {
    expect(() => clock.addClock('16:45')).toThrow();
  });

  it('должен восстанавливать возможность запуска звонков', () => {
    clock.addClock('16:45', () => {});
    clock.addClock('16:45', () => {});
    clock.addClock('16:45', () => {});

    expect(clock.alarmCollection.every(alarm => alarm.canCall)).toBe(true);
    clock.alarmCollection.forEach(alarm => alarm.canCall = false);
    expect(clock.alarmCollection.every(alarm => alarm.canCall)).toBe(false);
    clock.resetAllCalls();
    expect(clock.alarmCollection.every(alarm => alarm.canCall)).toBe(true);
  });

  it('должен запускать интервал, который не запустит колбек', (done) => {
    clock.addClock('16:45', () => {});
    clock.getCurrentFormattedTime = () => '17:00';
    clock.start();

    setTimeout(() => {
      expect(clock.alarmCollection[0].canCall).toBe(true);
      done();
    }, 1000);
  });

  it('должен запускать интервал, который запустит колбек', (done) => {
    let flagToCall = false;
    clock.addClock('16:45', () => flagToCall = true);
    clock.getCurrentFormattedTime = () => '16:45';
    clock.start();

    setTimeout(() => {
      expect(clock.alarmCollection[0].canCall).toBe(false);
      expect(flagToCall).toBe(true);
      done();
    }, 1000);
  });
});