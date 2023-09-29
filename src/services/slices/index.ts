import { combineReducers } from "redux";
import { taskSlice } from "./task";
import { listSlice } from "./list";
import { userSlice } from "./user";
import { sampleSlice } from "./sample";
import { companySlice } from "./company";
import { workSlice } from "./work";
import { stockSlice } from "./stock";
import { stepSlice } from "./step";
import { socketSlice } from "./socket";

export const rootReducer = combineReducers({
  list: listSlice.reducer,
  task: taskSlice.reducer,
  user: userSlice.reducer,
  sample: sampleSlice.reducer,
  company: companySlice.reducer,
  work: workSlice.reducer,
  stock: stockSlice.reducer,
  step: stepSlice.reducer,
  socket: socketSlice.reducer
});
