import { getCookie, setCookie } from "./cookies";

export const URL = "http://localhost:8000";
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
    headers: {
      "Content-Type": "application/json",
    },
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
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  }).then(responseCheck);
}

//Внести изменения о пользователе
export function editUsers(username: string, password: string) {
  return fetch(`${URL}/users`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  }).then(responseCheck);
}

//Удаление пользователя
export function deleteUsers(usernameId: any) {
  return fetch(`${URL}/users/${usernameId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(responseCheck);
}

// Получение всех задач
export function getTasksApi() {
  return fetch(`${URL}/tasks`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then(responseCheck);
}

// Получение всех задач конкретного пользователя
export function getTasksUserApi() {
  return fetch(`${URL}/tasks/:id`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then(responseCheck);
}

// Удаление конкретной задачи конкретного пользователя
export function deleteTasksUserApi() {
  return fetch(`${URL}/tasks/:id`,
   {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(responseCheck);
}

// Получение всех заявок
export function getListApi() {
  return fetch(`${URL}/list`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then(responseCheck);
}

//Получение профиля
export function getDataUser() {
  return fetch(`${URL}/user/me`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then(responseCheck);
}

export async function logoutUser() {
  return fetch(`${URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("token"),
    }),
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