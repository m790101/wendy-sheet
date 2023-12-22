import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loading from './loadSlice'
import msgSlice from './msgSlice';
import appSlice from './appSlice';
import { baseApiService } from '../service/apiService/baseApiService';
import apiLoadingMiddleware from './middleware/apiLoadingMiddleware';
// import apiLoadingMiddleware from './middleware/apiLoadingMiddleware';

const combinedReducer = combineReducers({
    // auth,
    loading:loading.reducer,
    msg: msgSlice.reducer,
    app: appSlice.reducer,
    [baseApiService.reducerPath]: baseApiService.reducer,
  });


  const middleware = [
    apiLoadingMiddleware,
    baseApiService.middleware,
  
  ]

const store = configureStore({
    reducer: combinedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(middleware),
})

export type RootState = ReturnType<typeof combinedReducer>;

export default store;