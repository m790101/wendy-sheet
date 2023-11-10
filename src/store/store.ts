import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loading from './appSlice'
import msgSlice from './msgSlice';
// import apiLoadingMiddleware from './middleware/apiLoadingMiddleware';

const combinedReducer = combineReducers({
    // auth,
    loading:loading.reducer,
    msg: msgSlice.reducer,
  });


const store = configureStore({
    reducer: combinedReducer,
})

export type RootState = ReturnType<typeof combinedReducer>;

export default store;