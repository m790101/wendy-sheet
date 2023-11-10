//a slicer for loading
import { createSlice } from '@reduxjs/toolkit';
//define a type for the slice state
interface LoadingState{
    isLoading: boolean;
}
//define the initial state
const initialState: LoadingState = {
    isLoading: false,
}
 const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers:{
        alterLoading: (state,action) => {
            state.isLoading= action.payload ;
        },
        
    }
})

export const { alterLoading } = loadingSlice.actions;
export default loadingSlice;



// import { createAction, createSlice } from "@reduxjs/toolkit"
// import type { PayloadAction } from "@reduxjs/toolkit"

// const initialState = {
//   isLogin: true,
//   loadingApiList: [] as string[],
//   isLoading:true
// }

// const appSlice = createSlice({
//   name: "app",
//   initialState,
//   reducers: {
//     addLoadingApi(state, action: PayloadAction<string>) {
//       state.loadingApiList.push(action.payload)
//     },
//     removeLoadingApi(state, action: PayloadAction<string>) {
//       state.loadingApiList = state.loadingApiList.filter(
//         (api) => api !== action.payload
//       )
//     },
//     updateLoginInfo(state, action: PayloadAction<{ isLogin: boolean }>) {
//       state.isLogin = action.payload.isLogin
//     },
//     alterLoading: (state,action) => {
//         state.isLoading= action.payload ;
//     },
//   },
// })

// // Extra Actions

// /**
//  * 此 action 被呼叫後會啟動 authListenerMiddleware
//  */
// export const startApp = createAction(`${appSlice.name}/startApp`)
// /**
//  * 此 action 被呼叫後會觸發 authListenerMiddleware 的邏輯
//  */
// export const logout = createAction(`${appSlice.name}/logout`)
// /**
//  * 此 action 被呼叫後會觸發 authListenerMiddleware 的邏輯
//  */

// export const {
//     addLoadingApi,
//     removeLoadingApi,
//     updateLoginInfo,
//     alterLoading
//   } = appSlice.actions
//   export default appSlice.reducer