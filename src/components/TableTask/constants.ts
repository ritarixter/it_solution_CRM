import avatar1 from "../../images/photo_2.jpg";
import avatar2 from "../../images/photo1.jpg";
export const titles = ['Кодовое имя','Важность' ,' Прогресс', 'Исполнители', 'Статус', 'Дедлайн']
export const data = [
    {
      id: 9,
      createdAt: "2023-06-21T08:10:02.596Z",
      updatedAt: "2023-06-27T09:21:58.615Z",
      name: "Заявка №2",
      customer: "Менеджер",
      description: null,
      endDate: null,
      status: null,
      importance: "Средняя",
      company: {
        id: 1,
        createdAt: "2023-06-19T12:10:19.116Z",
        updatedAt: "2023-06-19T13:43:39.940Z",
        nameCompany: "test1",
        name: "Гнездилова Маргарита",
        numberPhone: "+7999999900",
      },
      commercialProposal: null,
      users: [
        {
          id: 6,
          createdAt: "2023-06-19T13:26:29.255Z",
          updatedAt: "2023-06-19T13:26:29.255Z",
          name: "Иванов Иван Иванович",
          avatar: avatar1,
          access: "Менеджер",
          username: "user2",
        },
        {
          id: 4,
          createdAt: "2023-06-19T13:25:55.503Z",
          updatedAt: "2023-06-19T13:25:55.503Z",
          name: "Иванов Иван Иванович",
          avatar: avatar2,
          access: "Менеджер",
          username: "user1",
        },
      ],
      works: [
        {
          id: 1,
          createdAt: "2023-06-21T08:45:09.637Z",
          updatedAt: "2023-06-21T08:45:09.637Z",
          name: "Монтаж СКУД",
        },
        {
          id: 2,
          createdAt: "2023-06-21T12:03:19.595Z",
          updatedAt: "2023-06-21T12:03:19.595Z",
          name: "Закупка инструментов",
        },
      ],
    },
    {
      id: 10,
      createdAt: "2023-06-27T09:30:57.924Z",
      updatedAt: "2023-06-27T09:31:40.717Z",
      name: "Заявка №2",
      customer: "Менеджер",
      description: "Перезвонить в 12:00",
      endDate: "2023-06-21T08:10:02.596Z",
      status: "На согласовании",
      importance: null,
      company: {
        id: 1,
        createdAt: "2023-06-19T12:10:19.116Z",
        updatedAt: "2023-06-19T13:43:39.940Z",
        nameCompany: "test1",
        name: "Гнездилова Маргарита",
        numberPhone: "+7999999900",
      },
      commercialProposal: null,
      users: [
        {
          id: 11,
          createdAt: "2023-06-19T13:29:20.039Z",
          updatedAt: "2023-06-19T13:29:20.039Z",
          name: "Иванов Иван Иванович",
          avatar: avatar1,
          access: "Менеджер",
          username: "user4",
        },
        {
          id: 10,
          createdAt: "2023-06-19T13:28:30.595Z",
          updatedAt: "2023-06-19T13:28:30.595Z",
          name: "Иванов Иван Иванович",
          avatar: avatar2,
          access: "Менеджер",
          username: "user3",
        },
        {
          id: 9,
          createdAt: "2023-06-19T13:29:20.039Z",
          updatedAt: "2023-06-19T13:29:20.039Z",
          name: "Иванов Иван Иванович",
          avatar: avatar1,
          access: "Менеджер",
          username: "user4",
        },
        {
          id: 8,
          createdAt: "2023-06-19T13:28:30.595Z",
          updatedAt: "2023-06-19T13:28:30.595Z",
          name: "Иванов Иван Иванович",
          avatar: avatar2,
          access: "Менеджер",
          username: "user3",
        },
      ],
      works: [
        {
          id: 1,
          createdAt: "2023-06-21T08:45:09.637Z",
          updatedAt: "2023-06-21T08:45:09.637Z",
          name: "Монтаж СКУД",
        },
        {
          id: 2,
          createdAt: "2023-06-21T12:03:19.595Z",
          updatedAt: "2023-06-21T12:03:19.595Z",
          name: "Закупка инструментов",
        },
      ],
    },
  ];