import { AnyAction, combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import categoryReducer from './reducers/categorySlice';
import { commonApi } from 'services/commonApi';
import { rtkQueryErrorLogger } from 'services/rtkQueryErrorLogger';

const combinedReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  [commonApi.reducerPath]: commonApi.reducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(rtkQueryErrorLogger, commonApi.middleware),
});

export const setupStore = () => store;

export type RootState = ReturnType<typeof combinedReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
