import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice.ts';
import { authenticationService } from '../shared/services/authentication.service.ts';

const rootReducer = combineReducers({
  authentication: authSlice,
  [authenticationService.reducerPath]: authenticationService.reducer,
});

export const setupStore = (preloadedState?: object) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authenticationService.middleware),
    devTools: true,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
