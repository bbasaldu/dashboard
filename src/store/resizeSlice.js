import { createSlice } from "@reduxjs/toolkit";
const resizeSlice = createSlice({
    name: "charts",
    initialState: {resized: false},
    reducers: {
        setResized(state, action){
            state.resized = action.payload
        }
    }
})
export const resizeActions = resizeSlice.actions
export default resizeSlice.reducer