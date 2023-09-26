export const formatMMDD = (date: Date): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month < 10 ? '0' + month : month}.${day < 10 ? '0' + day : day}`;
};

export const formatYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더합니다.
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}.${month}.${day}`;
};

export const getSevenDaysAgo = (date: Date) => new Date(new Date().setDate(date.getDate() - 7));

export const getNextDay = (date: Date) => new Date(new Date().setDate(date.getDate() + 1));
