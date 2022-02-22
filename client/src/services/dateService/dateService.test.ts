import { getDate, getDuration, getTime } from './dateService';

describe('testing data service', () => {
  test('should return weekday from 0 to 6 and date in prettier format', () => {
    const date = '2022-02-16T18:49:33.002Z';
    const result = getDate(Date.parse(date));
    expect(result[0]).toBe(3);
    return expect(result[1]).toBe('16.2.2022');
  });

  test('should return correct values at the end boundary', () => {
    const date = '2022-02-16T21:59:33.000Z';
    const result = getDate(Date.parse(date));
    expect(result[0]).toBe(3);
    return expect(result[1]).toBe('16.2.2022');
  });

  test('should return correct values at the start boundary', () => {
    const date = '2022-02-15T22:00:00.000Z';
    const result = getDate(Date.parse(date));
    expect(result[0]).toBe(3);
    return expect(result[1]).toBe('16.2.2022');
  });

  test('should return a start and end time of event (notice UTC)', () => {
    const start = '2022-02-16T18:30:00.000Z';
    const end = '2022-02-16T20:30:00.000Z';
    const result = getTime(Date.parse(start), Date.parse(end));
    expect(result[0]).toBe('20.30');
    return expect(result[1]).toBe('22.30');
  });

  test('should return a duration of the event', () => {
    const start = '2022-02-16T18:30:00.000Z';
    const end = '2022-02-16T20:30:00.000Z';
    const result = getDuration(Date.parse(start), Date.parse(end));
    return expect(result).toBe('120 min');
  });
});
