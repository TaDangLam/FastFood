import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        accessToken: null,
        refreshToken: null
    },
    reducers: {
        Login: (state, action) => {
            state.user = action.payload.data;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            sessionStorage.setItem('user', JSON.stringify(action.payload.data));
            sessionStorage.setItem('accessToken', action.payload.accessToken);
            sessionStorage.setItem('refreshToken', action.payload.refreshToken);
        },
        Register: (state, action) => {
            state.user = action.payload;
        },
        UpdateUser: (state, action) => {
            state.user = action.payload
        },
        Logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            sessionStorage.clear();
        },
        addNewAddress: (state, action) => {
            state.user.address.push(action.payload);
        },
        updateAddress: (state, action) => {
            const index = state.user.address.findIndex(addr => addr._id === action.payload._id);
            if(index !== -1){
                state.user.address[index] = action.payload;
            }
        },
        deleteAddress: (state, action) => {
            state.user.address = state.user.address.filter(addr => addr._id !== action.payload);
        }

    }
})

export const { Login, Logout, Register, UpdateUser, addNewAddress, updateAddress, deleteAddress } = authSlice.actions;
export default authSlice.reducer;