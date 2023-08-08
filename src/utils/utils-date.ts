//Преобразовывает дату в формат: YYYY-MM-DD HH:MM:SS
export const formateDate = (date: Date) => {
  return (
    date.toLocaleString().slice(0, 10) +
    ", " +
    date.toLocaleString().slice(11, 16)
  );
};

//Преобразовывает дату в формат: YYYY-MM-D
export const formateDateShort = (date: Date) => {
  return date.toLocaleString().slice(0, 10);
};
//Преобразовывает дату в формат: HH:MM
export const formateDateOnlyTime = (date: Date) => {
  return date.toLocaleString().slice(11, 16);
};
