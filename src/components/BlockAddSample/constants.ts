import avatar1 from "../../images/photo_2.jpg";
import avatar2 from "../../images/photo1.jpg";
import word from "../../images/icons/Word.svg";
import pdf from "../../images/icons/pdf.svg";

export const titles = [
  "Название",
  "Количество работ",
  "Исполнители",
  "Документы",
];

export type TSample = {
  id: string;
  title: string;
  workId: string;
  // userId: Array<string>;
  userId: string;
  document: string;
  description?: string;
  selected?: Array<string>
};

export const sample: Array<TSample> = [
  {
    id: "1",
    title: "СКС",
    workId: "7",
    userId: "[avatar1, avatar1, avatar1]",
    document: word,
  },
  {
    id: "2",
    title: "Строительство",
    workId: "8",
    userId: "[avatar1, avatar1, avatar1]",
    document: word,
  },
  {
    id: "3",
    title: "Монтаж",
    workId: "10",
    userId: "[avatar1, avatar1, avatar1]",
    document: word,
  },
  {
    id: "4",
    title: "Проектирование",
    workId: "12",
    userId: "[avatar1, avatar1, avatar1]",
    document: pdf,
  },
  {
    id: "5",
    title: "Планирование",
    workId: "4",
    userId: "[avatar1, avatar1, avatar1]",
    document: word,
  },
];
