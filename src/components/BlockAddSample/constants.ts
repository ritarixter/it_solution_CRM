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
  work: string;
  avatar: Array<string>;
  document: string;
};

export const sample: Array<TSample> = [
  {
    id: "1",
    title: "СКС",
    work: "7",
    avatar: [avatar1, avatar1, avatar1],
    document: word,
  },
  {
    id: "2",
    title: "Строительство",
    work: "8",
    avatar: [avatar1, avatar1, avatar1],
    document: word,
  },
  {
    id: "3",
    title: "Монтаж",
    work: "10",
    avatar: [avatar1, avatar1, avatar1],
    document: word,
  },
  {
    id: "4",
    title: "Проектирование",
    work: "12",
    avatar: [avatar1, avatar1, avatar1],
    document: pdf,
  },
  {
    id: "5",
    title: "Планирование",
    work: "4",
    avatar: [avatar1, avatar1, avatar1],
    document: word,
  },
];
