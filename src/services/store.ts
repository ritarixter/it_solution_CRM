import { configureStore, ThunkAction, ActionCreator, AnyAction } from '@reduxjs/toolkit';
import { rootReducer } from './slices';


const store = configureStore({
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, RootState, any, AnyAction>>

export default store