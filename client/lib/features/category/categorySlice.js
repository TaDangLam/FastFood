import { createSlice } from "@reduxjs/toolkit";

export const cateSlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
    },
    reducers: {
        setCategory: (state, action) => {
            state.categories = action.payload;
        },
        addCategory: (state, action) => {
            state.categories.push(action.payload);
        },
        removeCategory: (state, action) => {
            state.categories = state.categories.filter(cate => cate._id !== action.payload);
        }
    }
})

export const { setCategory, addCategory, removeCategory } = cateSlice.actions;
export default cateSlice.reducer;