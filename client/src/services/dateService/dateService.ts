export const getDate = (unix: number) => {
  const date = new Date(unix);

  const weekday = date.getDay();
  const dateString = date.toLocaleDateString('fi-FI');

  return [weekday, dateString] as [number, string];
};

export const getTime = (startStamp: number, endStamp: number) => {
  const start = new Date(startStamp).toLocaleTimeString('fi-FI', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const end = new Date(endStamp).toLocaleTimeString('fi-FI', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return [start, end];
};

export const getDuration = (start: number, end: number) => {
  const startTime = new Date(start);
  const endTime = new Date(end);
  const difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
  const resultInMinutes = Math.round(difference / 60000);

  return `${resultInMinutes} min`;
};
