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
      description: description
    }),
  }).then(responseCheck);
}

//---------------------------------------------------------------LIST-------------------------------------------------------------------------------
// Получение всех заявок
export function getListApi() {
  return fetch(`${URL}/list`, {
    headers: {
      "Content-Type": "application/json",
    },
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
