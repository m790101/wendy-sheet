//a slicer for loading
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
//define a type for the slice state
// interface LoadingState{
//     isLoading: boolean;
// }
//define the initial state
const initialState = {
  isLogin: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateLoginInfo(state, action: PayloadAction<{ isLogin: boolean }>) {
        state.isLogin = action.payload.isLogin
      },
  },
});

export const selectIsLogin = (state: RootState) => {
    return state.app.isLogin
  }

export const { updateLoginInfo } = appSlice.actions;
export default appSlice;
