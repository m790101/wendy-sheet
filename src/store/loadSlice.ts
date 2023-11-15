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

