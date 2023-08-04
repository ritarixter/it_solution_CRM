import { IItem } from "../types/TItem";
import { getCookie, setCookie } from "./cookies";

export const URL = "http://localhost:8000";

const headersWithContentType = { "Content-Type": "application/json" };
const headersWithAuthorizeFn: HeadersInit = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${getCookie("accessToken")}`,
};

const responseCheck = (res: Response) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res.status);
  }
};

//login
export function signIn(username: string, password: string) {
  return fetch(`${URL}/signin`, {
    method: "POST",
    headers: headersWithContentType,
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  }).then(responseCheck);
}

//регистрация
export function signUp(username: string, password: string) {
  return fetch(`${URL}/signup`, {
    method: "POST",
    headers: headersWithContentType,
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  }).then(responseCheck);
}

//-------------------------------------------------------------------USER--------------------------------------------------------------------------------------
//Получение профиля
export function getDataUser() {
  return fetch(`${URL}/user/me`, {
    headers: headersWithAuthorizeFn,
  }).then(responseCheck);
}

export function getUsersApi() {
  return fetch(`${URL}/user`, {
    headers: headersWithAuthorizeFn,
  }).then(responseCheck);
}

/* export async function logoutUser() {
  return fetch(`${URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("token"),
    }),
  }).then(responseCheck);
} */

//Внести изменения о пользователе
export function editUsers(
  username?: string,
  password?: string,
  avatar?: string,
  name?: string,
  access?: string
) {
  return fetch(`${URL}/users`, {
    method: "PATCH",
    headers: headersWithAuthorizeFn,
    body: JSON.stringify({
      username: username,
      password: password,
      avatar: avatar,
      name: name,
      access: access,
    }),
  }).then(responseCheck);
}

//Удаление пользователя
export function deleteUsers(usernameId: any) {
  return fetch(`${URL}/users/${usernameId}`, {
    method: "DELETE",
    headers: headersWithAuthorizeFn,
  }).then(responseCheck);
}

//-------------------------------------------------------TASKS----------------------------------------------------------------------------------------------------------------

// Получение всех задач конкретного пользователя
export function getTasksUserApi() {
  return fetch(`${URL}/tasks`, {
    headers: headersWithAuthorizeFn,
  }).then(responseCheck);
}

export function getTaskByDateApi(date: Date) {
  return fetch(`${URL}/tasks/byDate`, {
    method: "POST",
    headers: headersWithAuthorizeFn,
    body: JSON.stringify({ endDate: new Date(date) }),
  }).then(responseCheck);
}

// Удаление конкретной задачи конкретного пользователя
export function deleteTaskUserApi(id: number) {
  return fetch(`${URL}/tasks/${id}`, {
    method: "DELETE",
    headers: headersWithAuthorizeFn,
  }).then(responseCheck);
}

// Добавление задачи
export function addTaskUserApi(
  title: string,
  status: string, //"Срочно" | "Несрочно";
  endDate: Date,
  done: boolean,
  description?: string
) {
  return fetch(`${URL}/tasks`, {
    method: "POST",
    headers: headersWithAuthorizeFn,
    body: JSON.stringify({
      done: done,
      status: status,
      endDate: endDate,
      title: title,
      description: description,
    }),
  }).then(responseCheck);
}

//Изменение статуса задачи на сделано/не сделано
export function updateTaskUserApi(
  id: number,
  done?: boolean,
  status?: string /*Срочно|Не срочно */,
  endDate?: Date,
  title?: string,
  description?: string
) {
  return fetch(`${URL}/tasks/${id}`, {
    method: "PATCH",
    headers: headersWithAuthorizeFn,
    body: JSON.stringify({
      done: done,
      status: status,
      endDate: endDate,
      title: title,
      description: description,
    }),
  }).then(responseCheck);
}

//---------------------------------------------------------------LIST-------------------------------------------------------------------------------
// Получение всех заявок
export function getListApi() {
  return fetch(`${URL}/list`, {
    headers: headersWithAuthorizeFn,
  }).then(responseCheck);
}

export function addListApi(
  name: string,
  customer: string,
  INNCompany: string,
  description?: string
) {
  return fetch(`${URL}/list`, {
    method: "POST",
    headers: headersWithAuthorizeFn,
    body: JSON.stringify({
      name: name,
      customer: customer,
      INNCompany: INNCompany,
      description: description,
    }),
  }).then(responseCheck);
}

export function getListByIdApi(id: number) {
  return fetch(`${URL}/list/${id}`, {
    method: "GET",
    headers: headersWithAuthorizeFn,
  }).then(responseCheck);
}

//Обновление токена
export function refreshToken() {
  return fetch(`${URL}/auth/token `, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("token"),
    }),
  })
    .then(responseCheck)
    .then((refreshData) => {
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("token", refreshData.refreshToken);
      setCookie("accessToken", refreshData.accessToken);
      return refreshData;
    });
}

export function updateListApi(
  id: number,
  name?: string,
  customer?: string,
  description?: string,
  idCompany?: number
) {
  return fetch(`${URL}/list/${id}`, {
    method: "PATCH",
    headers: headersWithAuthorizeFn,
    body: JSON.stringify({
      name,
      customer,
      description,
      idCompany,
    }),
  }).then(responseCheck);
}

export function deleteListApi(id: number) {
  return fetch(`${URL}/list/${id}`, {
    method: "DELETE",
    headers: headersWithAuthorizeFn,
  }).then(responseCheck);
}

//Жепа
/* export function getDataUser() {
  return fetch(`${URL}/auth/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken"),
    },
  })
    .then(responseCheck)
    .catch((err) => {
      if (err === 403) {
        refreshToken().then((refreshData) => {
          return fetch(`${URL}/auth/user`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: refreshData.accessToken,
            },
          }).then(responseCheck);
        });
      } else {
        return Promise.reject(`Ошибка: ${err.status}`);
      }
    });
} */

//---------------------------------------------------------------SAMPLE-------------------------------------------------------------------------------

// Получение всех шаблонов
export function getSampleApi() {
  return fetch(`${URL}/plan`, {
    headers: headersWithAuthorizeFn,
  }).then(responseCheck);
}

export function getSampleByIdApi(id: number) {
  return fetch(`${URL}/plan/${id}`, {
    method: "GET",
    headers: headersWithAuthorizeFn,
  }).then(responseCheck);
}

// Добавление шаблона
export function addSampleApi(
  title: string,
  works: number[],
  users?: number[],
  description?: string
) {
  return fetch(`${URL}/plan`, {
    method: "POST",
    headers: headersWithAuthorizeFn,
    body: JSON.stringify({
      usersId: users,
      worksId: works,
      title: title,
      description: description,
    }),
  }).then(responseCheck);
}

// Изменение шаблона
export function updateSampleApi(
  id: number,
  title: string,
  worksId: number[],
  usersId?: number[],
  description?: string,
) {
  return fetch(`${URL}/plan/${id}`, {
    method: "PATCH",
    headers: headersWithAuthorizeFn,
    body: JSON.stringify({
      title,
      worksId,
      usersId,
      description,
    }),
  }).then(responseCheck);
}

// Удаление шаблона
export function deleteSampleApi(id: number) {
  return fetch(`${URL}/plan/${id}`, {
    method: "DELETE",
    headers: headersWithAuthorizeFn,
  }).then(responseCheck);
}

//---------------------------------------------------------------COMPANY-------------------------------------------------------------------------------

export function getCompaniesApi() {
  return fetch(`${URL}/company`, {
    headers: headersWithAuthorizeFn,
  }).then(responseCheck);
}

// Добавление задачи
export function addCompanyApi(
  nameCompany: string,
  name: string,
  numberPhone: string,
  INN: string,
  email?: string
) {
  return fetch(`${URL}/company`, {
    method: "POST",
    headers: headersWithAuthorizeFn,
    body: JSON.stringify({
      nameCompany: nameCompany,
      name: name,
      numberPhone: numberPhone,
      INN: INN,
      email: email,
    }),
  }).then(responseCheck);
}

export function updateCompanyApi(
  id: number,
  nameCompany?: string,
  name?: string,
  numberPhone?: string,
  INN?: string,
  email?: string
) {
  return fetch(`${URL}/company/${id}`, {
    method: "PATCH",
    headers: headersWithAuthorizeFn,
    body: JSON.stringify({
      nameCompany,
      name,
      numberPhone,
      INN,
      email,
    }),
  }).then(responseCheck);
}

//---------------------------------------------------------------WORK-------------------------------------------------------------------------------

// Получение всех работ
export function getWorkApi() {
  return fetch(`${URL}/work`, {
    headers: headersWithAuthorizeFn,
  }).then(responseCheck);
}

//-------------------------------------------------------------------Commercial-Proposal--------------------------------------------------------------------------------------

export function getCommercialProposalApi() {
  return fetch(`${URL}/commercial-proposal`, {
    headers: headersWithAuthorizeFn,
  }).then(responseCheck);
}

export function addCommercialProposalApi(
  name: string,
  idList: number,
  products: Array<IItem>
) {
  return fetch(`${URL}/commercial-proposal`, {
    method: "POST",
    headers: headersWithAuthorizeFn,
    body: JSON.stringify({
      name: name,
      idList: idList,
      products: products,
    }),
  }).then(responseCheck);
}
