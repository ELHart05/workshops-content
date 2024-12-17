import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./slices/bankSlice";

const store = configureStore({
    reducer: {
        bank: dataSlice
    }
})

export default store;