import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        allProduct: [],
        fewProducts: [],
        allProductCategory: [],
        productById: {}
    },
    reducers: {
        setAllProduct: (state, action) => {
            state.allProduct = action.payload;
        },
        addProduct: (state, action) => {
            state.allProduct.push(action.payload);
        },
        updateProduct: (state, action) => {
            state.productById = action.payload;
        },
        setProductByCategory: (state, action) => {
            state.fewProducts = action.payload
        },
        setAllProductByCategory: (state, action) => {
            state.allProductCategory = action.payload
        },
        setAllProductById: (state, action) => {
            state.productById = action.payload
        }
    }
})

export const { 
    setProductByCategory, 
    setAllProductByCategory, 
    setAllProductById, 
    setAllProduct, 
    addProduct,
    updateProduct
} = productSlice.actions;
export default productSlice.reducer;