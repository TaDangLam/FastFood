import axios from "axios";

import { setCategory, addCategory, removeCategory } from "@/lib/features/category/categorySlice";
import { setProductByCategory, setAllProductByCategory, setAllProductById, setAllProduct, addProduct, updateProduct } from "@/lib/features/product/productSlice";
import { Login, Logout, Register, UpdateUser, addNewAddress, updateAddress, deleteAddress } from '@/lib/features/user/authSlice'

const baseUrl = process.env.NEXT_PUBLIC_API_BACKEND;

// ---------------------------- Category -----------------------------
export const fetchAllCategory = async(dispatch) => {
    try {
        const response = await axios.get(`${baseUrl}/category`);
        dispatch(setCategory(response.data.data));
    } catch (error) {
        console.log('Get All Category error : ', error);
        throw error;
    }
}

export const createCategory = async(accessToken, data, dispatch) => {
    try {
        const { name } = data
        const response = await axios.post(`${baseUrl}/category/add-cate`, { name }, {
            headers: {
                'token': `Bearer ${accessToken}`
            }
        });
        dispatch(addCategory(response.data.data))
    } catch (error) {
        console.log('Create Category error ', error);
        throw error;
    }
}

export const updateCategory = async(cid) => {
    try {
        const response = await axios.patch(`${baseUrl}/category/update-cate/${cid}`);
        return response.data.data;
    } catch (error) {
        console.log('Update Category error: ', error);
        throw error;
    }
}

export const deleteCategory = async(cid, accessToken, dispatch) => {
    try {
        const response = await axios.delete(`${baseUrl}/category/delete-cate/${cid}`, {
            headers: {
                'token': `Bearer ${accessToken}`
            }
        });
        dispatch(removeCategory(cid));
        // return response.data.message;
    } catch (error) {
        console.log('Delete Category Error: ', error);
        throw error;
    }
}

// ---------------------------- Product -----------------------------
export const getAllProduct = async(accessToken) => {
    try {
        const response = await axios.get(`${baseUrl}/product`, {
            headers: {
                'token': `Bearer ${accessToken}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.log('Get All Product Error: ', error);
        throw error;
    }
}

export const getProductCategory = async(cid, dispatch) => {
    try {
        const response = await axios.get(`${baseUrl}/product/getFew-product-cate/${cid}`);
        dispatch(setProductByCategory(response.data.data));
    } catch (error) {
        console.log('Get Product Category: ', error);
        throw error;
    }
}

export const getAllProductByCategory = async(cid, dispatch) => {
    try {
        const response = await axios.get(`${baseUrl}/product/getAll-product-cate/${cid}`);
        dispatch(setAllProductByCategory(response.data.data));
    } catch (error) {
        console.log('Get All Product By Category error: ', error);
        throw error;
    }
}

export const getAllProductById = async(pid, dispatch) => {
    try {
        const response = await axios.get(`${baseUrl}/product/get-detail/${pid}`);
        dispatch(setAllProductById(response.data.data));
        return response.data.data;
    } catch (error) {
        console.log('Get All Product By Id error: ', error);
        throw error;
    }
}

export const createProduct = async(data, accessToken) => {
    try {
        const response = await axios.post(`${baseUrl}/product/add-product`, data, {
            headers: {
                'token': `Bearer ${accessToken}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.log('Create Product error: ', error);
        throw error;
    }
}

export const Updateproduct = async(id, data, accessToken) => {
    try {
        const response = await axios.patch(`${baseUrl}/product/update-product/${id}`, data, {
            headers: {
                'token': `Bearer ${accessToken}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.log('Update Product error: ', error);
        throw error;
    }
}

export const removeProduct = async(id, accessToken) => {
    try {
        const response = await axios.delete(`${baseUrl}/product/delete-product/${id}`, {
            headers: {
                'token': `Bearer ${accessToken}`
            }
        });
        return response.data.message;
    } catch (error) {
        console.log('Delete Product error: ', error);
        throw error;
    }
}

// ---------------------------- Review -----------------------------
export const getReviewById = async(id) => {
    try {
        const response = await axios.get(`${baseUrl}/review/get-detail/${id}`);
        return response.data.data;
    } catch (error) {
        console.log('Get Review Id error: ', error);
        throw error;
    }
}



// ---------------------------- User (Be careful response.data.data) -----------------------------
export const getAllUser = async(accessToken) => {
    try {
        const response = await axios.get(`${baseUrl}/user/getAll`, {
            headers: {
                'token': `Bearer ${accessToken}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.log('Get All User error: ', error);
        throw error;
    }
}

export const getAllStaff = async(accessToken) => {
    try {
        const response = await axios.get(`${baseUrl}/user/get-all-staff`, {
            headers: {
                'token': `Bearer ${accessToken}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.log('Get All Staff error: ', error);
        throw error;
    }
}

export const getDetailUser = async(id, accessToken) => {
    try {
        const response = await axios.get(`${baseUrl}/user/get-detail-user/${id}`, {
            headers: {
                'token': `Bearer ${accessToken}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.log('Get Detail User error: ', error);
        throw error;
    }
}

export const login = async(username, password, dispatch) => {
    try {
        const response = await axios.post(`${baseUrl}/user/login`, {
            name: username,
            password: password
        });
        const { data, accessToken, refreshToken } = response.data;
        dispatch(Login({ data, accessToken, refreshToken }));
        return response.data.data.role;
    } catch (error) {
        console.log('Login error: ', error);
        throw error;
    }
}

export const register = async(newUser) => {
    try {
        const { username, password, repeatPassword, email, phone, fullName } = newUser;
        const response = await axios.post(`${baseUrl}/user/register`, {
            fullName,
            name: username,
            email,
            password,
            confirmPassword: repeatPassword,
            phone
        });
        return response.data.data
    } catch (error) {
        console.log('Register error: ', error);
        throw error;
    }
}

export const updateUser = async(updateUser, dispatch) => {
    try {
        const { email, password, repeatPassword, phone, accessToken, userID, fullName } = updateUser;
        const response = await axios.patch(`${baseUrl}/user/update-user/${userID}`, {
            fullName,
            email,
            password,
            confirmPassword: repeatPassword,
            phone
        }, {
            headers: {
                'token': `Bearer ${accessToken}`
            }
        });
        dispatch(UpdateUser(response.data.data));
    } catch (error) {
        console.log('Update User error: ', error);
        throw error;
    }
}

export const deleteUser = async(id, accessToken) => {
    try {
        const response = await axios.delete(`${baseUrl}/user/delete-user/${id}`, {
            headers: {
                'token': `Bearer ${accessToken}`
            }
        });
        return response.data.message;
    } catch (error) {
        console.log('Delte User error: ', error);
        throw error;
    }
}

export const logout = (dispatch) => {
    dispatch(Logout());
}


// ---------------------------- Address  -----------------------------
export const getAllAddressUser = async(accessToken) => {
    try {
        const response = await axios.get(`${baseUrl}/address`, {headers: {'token': `Bearer ${accessToken}` }});
        // dispatch(addNewAddress(response.data.data));
        return response.data.data;
    } catch (error) {
        console.log('Get All Address error: ', error);
        throw error;
    }
}

export const getDetailAddress = async(id, accessToken) => {
    try {
        const response = await axios.get(`${baseUrl}/address/get-detail/${id}`, {headers: {'token': `Bearer ${accessToken}` }});
        // dispatch(addNewAddress(response.data.data));
        return response.data.data;
    } catch (error) {
        console.log('Get All Address error: ', error);
        throw error;
    }
}

export const addAddress = async(data, userId, accessToken) => {
    try {
        const { street, city, province } = data;
        const response = await axios.post(`${baseUrl}/address/add-address/${userId}`, { street, city, province }, {headers: {'token': `Bearer ${accessToken}` }});
        // dispatch(addNewAddress(response.data.data));
        return response.data.data;
    } catch (error) {
        console.log('Add Address error: ', error);
        throw error;
    }
}

export const updateAddr = async(data, addressId, accessToken) => {
    try {
        const { street, city, province } = data;
        const response = await axios.patch(`${baseUrl}/address/update-address/${addressId}`, { street, city, province }, {headers: {'token': `Bearer ${accessToken}` }});
        // dispatch(updateAddress(response.data.data));
        return response.data.data;
    } catch (error) {
        console.log('Update Address error: ', error);
        throw error;
    }
}

export const removeAddress = async(addressId, accessToken, dispatch) => {
    try {
        const response = await axios.delete(`${baseUrl}/address/delete-address/${addressId}`, {headers: {'token': `Bearer ${accessToken}` }});
        // dispatch(deleteAddress(addressId));
        return response.data.data;
        // console.log(response.data.message);
    } catch (error) {
        console.log('Remove Address error: ', error);
        throw error;
    }
}


// ---------------------------- Order  -----------------------------
export const getAllOrderAdmin = async(accessToken) => {
    try {
        const response = await axios.get(`${baseUrl}/order/get-all-order`, { headers: {'token': `Bearer ${accessToken}` } });
        return response.data.data;
    } catch (error) {
        console.log('Get All Order Admin error: ', error);
        throw error;
    }
}

export const getOrderDetail = async(id, accessToken) => {
    try {
        const response = await axios.get(`${baseUrl}/order/get-detail-order/${id}`, {headers: {'token': `Bearer ${accessToken}` }});
        return(response.data.data);
    } catch (error) {
        console.log('Get All Order User error: ', error);
        throw error;
    }
}

export const createOrder = async(data, accessToken) => {
    try {
        const { orderBy, paymentType, totalPrice, orderDetail, address, isPaid } = data
        const response = await axios.post(`${baseUrl}/order/create-order`, 
        { orderBy, paymentType, totalPrice, orderDetail, address, isPaid }, 
        {headers: {'token': `Bearer ${accessToken}` }});
        return(response.data.data);
    } catch (error) {
        console.log('Create Order error: ', error);
        throw error;
    }
}

export const getAllOrderUser = async(accessToken) => {
    try {
        const response = await axios.get(`${baseUrl}/order/get-all-order-user`, {headers: {'token': `Bearer ${accessToken}` }});
        return(response.data.data);
    } catch (error) {
        console.log('Get All Order User error: ', error);
        throw error;
    }
}

export const getAllOrderPendingUser = async(accessToken) => {
    try {
        const response = await axios.get(`${baseUrl}/order/pending`, {headers: {'token': `Bearer ${accessToken}` }});
        return(response.data.data);
    } catch (error) {
        console.log('Get All Order User error: ', error);
        throw error;
    }
}

export const getAllOrderProcessingUser = async(accessToken) => {
    try {
        const response = await axios.get(`${baseUrl}/order/processing`, {headers: {'token': `Bearer ${accessToken}` }});
        return(response.data.data);
    } catch (error) {
        console.log('Get All Order User error: ', error);
        throw error;
    }
}

export const getAllOrderDeliveredUser = async(accessToken) => {
    try {
        const response = await axios.get(`${baseUrl}/order/delivered`, {headers: {'token': `Bearer ${accessToken}` }});
        return(response.data.data);
    } catch (error) {
        console.log('Get All Order User error: ', error);
        throw error;
    }
}

export const getAllOrderCancleUser = async(accessToken) => {
    try {
        const response = await axios.get(`${baseUrl}/order/cancelled`, {headers: {'token': `Bearer ${accessToken}` }});
        return(response.data.data);
    } catch (error) {
        console.log('Get All Order User error: ', error);
        throw error;
    }
}