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

// Получение информации о задачах
export function getTasks() {
  return fetch(`${URL}/tasks`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then(responseCheck);
}