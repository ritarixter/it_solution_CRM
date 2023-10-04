import {
  IProducts,
  TFile,
  TSampleUpdate,
  TUpdateCommercialProposal,
  TUpdateList,
  TUpdateTask,
} from "../types";
import Cookies from "js-cookie";
import { URL_BACKEND } from "./constants";

const URL = URL_BACKEND;

const headersWithContentType = { "Content-Type": "application/json" };
const headersWithAuthorizeFn = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${Cookies.get("accessToken")}`,
});

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
    headers: headersWithAuthorizeFn(),
  }).then(responseCheck);
}

export function getUsersApi() {
  return fetch(`${URL}/user`, {
    headers: headersWithAuthorizeFn(),
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

//
export function changeCountNotifyApi(idUser:number,count: number) {
  return fetch(`${URL}/user/${idUser}`, {
    method: "PATCH",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify({
      count,
    }),
  }).then(responseCheck);
}

//Внести изменения о пользователе
export function editUsers(
  username?: string,
  password?: string,
  avatar?: string,
  phone?: string,
  name?: string,
  access?: string
) {
  return fetch(`${URL}/user/{id}`, {
    method: "PATCH",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify({
      username: username,
      password: password,
      avatar: avatar,
      phone: phone,
      name: name,
      access: access,
    }),
  }).then(responseCheck);
}

//Добавление пользователя
export function addUserApi(
  name: string,
  username: string,
  password: string,
  access: string,
  phone: string,
  avatar: string
) {
  return fetch(`${URL}/user`, {
    method: "POST",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify({
      name: name,
      username: username,
      password: password,
      access: access,
      phone: phone,
      avatar: avatar,
    }),
  }).then(responseCheck);
}

//Удаление пользователя
export function deleteUsers(usernameId: any) {
  return fetch(`${URL}/users/${usernameId}`, {
    method: "DELETE",
    headers: headersWithAuthorizeFn(),
  }).then(responseCheck);
}

//-------------------------------------------------------TASKS----------------------------------------------------------------------------------------------------------------

// Получение всех задач конкретного пользователя
export function getTasksUserApi() {
  return fetch(`${URL}/tasks`, {
    headers: headersWithAuthorizeFn(),
  }).then(responseCheck);
}

export function getTaskByDateApi(date: Date) {
  return fetch(`${URL}/tasks/byDate`, {
    method: "POST",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify({ endDate: new Date(date) }),
  }).then(responseCheck);
}

// Удаление конкретной задачи конкретного пользователя
export function deleteTaskUserApi(id: number) {
  return fetch(`${URL}/tasks/${id}`, {
    method: "DELETE",
    headers: headersWithAuthorizeFn(),
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
  // const times = formateDateOnlyTime(endDate).split(":")
  console.log(endDate.toLocaleString);
  return fetch(`${URL}/tasks`, {
    method: "POST",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify({
      done: done,
      status: status,
      // endDate: new Date(endDate.setUTCHours(Number(times[0]), Number(times[1]))),
      endDate: endDate,
      title: title,
      description: description,
    }),
  }).then(responseCheck);
}

//Изменение статуса задачи
export function updateTaskUserApi(task: TUpdateTask) {
  return fetch(`${URL}/tasks/${task.id}`, {
    method: "PATCH",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify(task),
  }).then(responseCheck);
}

//---------------------------------------------------------------LIST-------------------------------------------------------------------------------
// Получение всех заявок
export function getListApi() {
  return fetch(`${URL}/list`, {
    headers: headersWithAuthorizeFn(),
  }).then(responseCheck);
}

export function addListApi(
  address: string,
  customer: string,
  INNCompany: string,
  files?: Array<TFile>
) {
  return fetch(`${URL}/list`, {
    method: "POST",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify({
      address: address,
      customer: customer,
      INNCompany: INNCompany,
      files: files,
    }),
  }).then(responseCheck);
}

export function getListByIdApi(id: number) {
  return fetch(`${URL}/list/${id}`, {
    method: "GET",
    headers: headersWithAuthorizeFn(),
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
      Cookies.set("accessToken", refreshData.accessToken, { expires: 1 / 24 });
      return refreshData;
    });
}

export function updateListApi(list: TUpdateList) {
  return fetch(`${URL}/list/${list.id}`, {
    method: "PATCH",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify(list),
  }).then(responseCheck);
}

export function deleteListApi(id: number) {
  return fetch(`${URL}/list/${id}`, {
    method: "DELETE",
    headers: headersWithAuthorizeFn(),
  }).then(responseCheck);
}

export function deleteListFileApi(
  id: number,
  pathFile: string,
  access: string
) {
  return fetch(`${URL}/list/${id}/upload`, {
    method: "DELETE",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify({
      filePath: pathFile,
      access: access,
    }),
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
    headers: headersWithAuthorizeFn(),
  }).then(responseCheck);
}

export function getSampleByIdApi(id: number) {
  return fetch(`${URL}/plan/${id}`, {
    method: "GET",
    headers: headersWithAuthorizeFn(),
  }).then(responseCheck);
}

// Добавление шаблона
export function addSampleApi(
  title: string,
  works: number[],
  users?: number[],
  description?: string,
  files?: Array<TFile>
) {
  return fetch(`${URL}/plan`, {
    method: "POST",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify({
      usersId: users,
      worksId: works,
      title: title,
      description: description,
      files: files,
    }),
  }).then(responseCheck);
}

// Изменение шаблона
export function updateSampleApi(sample: TSampleUpdate) {
  return fetch(`${URL}/plan/${sample.id}`, {
    method: "PATCH",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify(sample),
  }).then(responseCheck);
}

// Удаление шаблона
export function deleteSampleApi(id: number) {
  return fetch(`${URL}/plan/${id}`, {
    method: "DELETE",
    headers: headersWithAuthorizeFn(),
  }).then(responseCheck);
}

//---------------------------------------------------------------COMPANY-------------------------------------------------------------------------------

export function getCompaniesApi() {
  return fetch(`${URL}/company`, {
    headers: headersWithAuthorizeFn(),
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
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify({
      nameCompany: nameCompany,
      name: name,
      numberPhone: numberPhone,
      INN: INN,
      email: email === "" ? undefined : email,
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
    headers: headersWithAuthorizeFn(),
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
    headers: headersWithAuthorizeFn(),
  }).then(responseCheck);
}

//-------------------------------------------------------------------Commercial-Proposal--------------------------------------------------------------------------------------

export function getByIdCommercialProposalApi(id: number) {
  return fetch(`${URL}/list/${id}/commercial-proposal`, {
    headers: headersWithAuthorizeFn(),
  }).then(responseCheck);
}

export function addCommercialProposalApi(
  name: string,
  idList: number,
  products: Array<IProducts>,
  summaBuy: string,
  summaSale: string
) {
  return fetch(`${URL}/commercial-proposal`, {
    method: "POST",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify({
      name: name,
      idList: idList,
      products: products,
      summaBuy: summaBuy,
      summaSale: summaSale,
    }),
  }).then(responseCheck);
}

export function updateCommercialProposalApi(
  commercialProposal: TUpdateCommercialProposal
) {
  return fetch(`${URL}/commercial-proposal/${commercialProposal.id}`, {
    method: "PATCH",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify(commercialProposal),
  }).then(responseCheck);
}

//---------------------------------------------------------------FILES-------------------------------------------------------------------------------

// Получение всех работ
export function uploadFiles(files: any) {
  return fetch(`${URL}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
    body: files,
  }).then(responseCheck);
}

export function deleteFilesApi(filePath: string) {
  return fetch(`${URL}/upload`, {
    method: "DELETE",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify({
      filePath: filePath,
    }),
  }).then(responseCheck);
}

//############################################################# STOCK #########################################################

export async function getStockApi() {
  const res = await fetch(`${URL}/stock`, {
    headers: headersWithAuthorizeFn(),
  });
  return responseCheck(res);
}

//---------------------------------------------------------------STEP-------------------------------------------------------------------------------

export function updateStepApi(id: number, idStep: number) {
  return fetch(`${URL}/step/${id}`, {
    method: "PATCH",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify({
      idStep: idStep,
    }),
  }).then(responseCheck);
}

export function getStepApi() {
  return fetch(`${URL}/step`, {
    headers: headersWithAuthorizeFn(),
  }).then(responseCheck);
}

export function deleteStepApi(id: number) {
  return fetch(`${URL}/step/${id}`, {
    method: "DELETE",
    headers: headersWithAuthorizeFn(),
  }).then(responseCheck);
}

//---------------------------------------------------------------COMMENT-------------------------------------------------------------------------------
export function getCommentsApi() {
  return fetch(`${URL}/comment`, {
    headers: headersWithAuthorizeFn(),
  }).then(responseCheck);
}

export function deleteCommentApi(id: number) {
  return fetch(`${URL}/comment/${id}`, {
    method: "DELETE",
    headers: headersWithAuthorizeFn(),
  }).then(responseCheck);
}

export function addCommentApi(listId: number, userId: number, comment: string) {
  return fetch(`${URL}/comment`, {
    method: "POST",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify({
      listId: listId,
      userId: userId,
      comment: comment,
    }),
  }).then(responseCheck);
}

export function updateCommentApi(
  listId: number,
  userId: number,
  comment: string
) {
  return fetch(`${URL}/comment`, {
    method: "PATCH",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify({
      listId: listId,
      userId: userId,
      comment: comment,
    }),
  }).then(responseCheck);
}


//---------------------------------------------------------------NOTIFY-------------------------------------------------------------------------------

export function addNotifyApi(listId: number, usersId: number[], message: string) {
  return fetch(`${URL}/notify`, {
    method: "POST",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify({
      listId: listId,
      usersId: usersId,
      message: `№${listId} ${message}`,
    }),
  }).then(responseCheck);
}

export function updateNotifyApi(id: number, isWatched: boolean) {
  return fetch(`${URL}/notify/${id}`, {
    method: "PATCH",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify({
      isWatched
    }),
  }).then(responseCheck);
}