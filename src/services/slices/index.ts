import { combineReducers } from 'redux';
import { taskSlice } from './task';
import { listSlice } from './list';
import { userSlice } from './user';

export const rootReducer = combineReducers({
  list: listSlice.reducer,
  task: taskSlice.reducer,
  user: userSlice.reducer
});