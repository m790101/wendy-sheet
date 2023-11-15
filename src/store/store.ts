import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loading from './loadSlice'
import msgSlice from './msgSlice';
import appSlice from './appSlice';
// import apiLoadingMiddleware from './middleware/apiLoadingMiddleware';

const combinedReducer = combineReducers({
    // auth,
    loading:loading.reducer,
    msg: msgSlice.reducer,
    app: appSlice.reducer,
  });


const store = configureStore({
    reducer: combinedReducer,
})

export type RootState = ReturnType<typeof combinedReducer>;

export default store;