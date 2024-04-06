import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cart.findIndex(item => item.item._id === action.payload._id);
            if(existingItem !== -1){
                state.cart[existingItem].quantity += 1;
                state.cart[existingItem].total = state.cart[existingItem].quantity * state.cart[existingItem].item.price;
            }else{
                const newItem = {
                    item: action.payload,
                    quantity: 1,
                    total: action.payload.price
                }
                state.cart.push(newItem);
            }
        },
        removeProduct: (state, action) => {
            state.cart = state.cart.filter(item => item.item._id !== action.payload.item._id);
        },
        increaseQuantity: (state, action) => {
            const itemIndex = state.cart.findIndex(item => item.item._id === action.payload.item._id);
            state.cart[itemIndex].quantity++;
            state.cart[itemIndex].total = state.cart[itemIndex].quantity * state.cart[itemIndex].item.price;
        },
        decreaseQuantity: (state, action) => {
            const itemIndex = state.cart.findIndex(item => item.item._id === action.payload.item._id);
            if(state.cart[itemIndex].quantity > 1) {
                state.cart[itemIndex].quantity--;
                state.cart[itemIndex].total =  state.cart[itemIndex].quantity *  state.cart[itemIndex].item.price;
            }
        },
        clearOrderedProducts: (state, action) => {
            const orderedProductIds = action.payload;
            state.cart = state.cart.filter(item => !orderedProductIds.includes(item.item._id));
        },
        clearCart: (state) => {
            state.cart = [];
        }
    }
})

export const {
    addToCart, 
    clearCart, 
    removeProduct, 
    increaseQuantity, 
    decreaseQuantity,
    clearOrderedProducts
} = cartSlice.actions;
export default cartSlice.reducer;