import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: 'bank',
    initialState: {
        name: '',
        price: 0
    },
    reducers: {
        changeName: (state, action) => {
            state.name = action.payload;
        },
        updatePrice: (state, action) => {
            state.price += action.payload;
        }
    }
})

export const { changeName, updatePrice } = dataSlice.actions;

export default dataSlice.reducer;