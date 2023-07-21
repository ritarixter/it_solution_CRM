import { combineReducers } from "redux";
import { taskSlice } from "./task";
import { listSlice } from "./list";
import { userSlice } from "./user";
import { sampleSlice } from "./sample";
import { companySlice } from "./company";

export const rootReducer = combineReducers({
  list: listSlice.reducer,
  task: taskSlice.reducer,
  user: userSlice.reducer,
  sample: sampleSlice.reducer,
  company: companySlice.reducer
});
