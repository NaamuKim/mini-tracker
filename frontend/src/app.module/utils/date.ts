export const formatMMDD = (date: Date): string => {
  const month = date.getMonth() + 1; // getMonth()는 0부터 시작합니다.
  const day = date.getDate();
  return `${month < 10 ? '0' + month : month}.${day < 10 ? '0' + day : day}`;
};
