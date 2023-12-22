//a slicer for loading
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

//define the initial state
const initialState = {
    loadingApiList: [] as string[] 
}


 const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers:{
        addLoadingApi: (state, action: PayloadAction<string>) => {
            state.loadingApiList.push(action.payload)
        },
        removeLoadingApi: (state, action: PayloadAction<string>) => {
            state.loadingApiList = state.loadingApiList.filter(api => api !== action.payload)
        }
        
    }
})


export const { addLoadingApi, removeLoadingApi } = loadingSlice.actions
export default loadingSlice;

