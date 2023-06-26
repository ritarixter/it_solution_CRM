import { combineReducers } from 'redux';
//import { userSlice } from './user';
import { taskSlice } from './task';

export const rootReducer = combineReducers({
 // user: userSlice.reducer,
  task: taskSlice.reducer
});