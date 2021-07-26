import { configureStore } from "@reduxjs/toolkit";
import resizeReducer from './resizeSlice'
const store = configureStore({reducer: {resizeState: resizeReducer}})
export default store;