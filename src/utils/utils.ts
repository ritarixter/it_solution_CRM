export const range = (start: number, end: number) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

//Преобразовывает дату в формат: YYYY-MM-DD HH:MM:SS
export const formateDate = (date: Date) => {
  return date.toLocaleString().slice(0, 10) + " " + date.toLocaleString().slice(11, 19)
  
};
