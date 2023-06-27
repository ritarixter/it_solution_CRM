//Преобразовывает дату в формат: YYYY-MM-DD HH:MM:SS
export const formateDate = (date: Date) => {
    return date.toLocaleString().slice(0, 10) + " " + date.toLocaleString().slice(11, 19)
  };

  