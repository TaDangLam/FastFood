import { StatusCodes} from 'http-status-codes';
import bcrypt from 'bcrypt';

import userService from "../service/userService.js";
import middlewareToken from '../service/jwtService.js';

const userController = {
    getAllUser: async(req, res) => {
        try {
            const response = await userService.getAllUser();
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    getAllStaff: async(req, res) => {
        try {
            const response = await userService.getAllStaff();
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    getDetailUser: async(req, res) => {
        const id = req.params.id;
        try {
            const response = await userService.getDetailUser(id);
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }  
    },
    register: async(req, res) => {
        try {
           const { name, fullName, email, password, confirmPassword, phone } = req.body;
            const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
            const checkMail = regex.test(email);
            if(!name || !email || !password || !confirmPassword || !phone || !fullName){
                return res.status(StatusCodes.BAD_REQUEST).json({error: 'Please complete all information'});
            } else if (!checkMail) {
                return res.status(StatusCodes.BAD_REQUEST).json({error: 'Email is not valid'})
            } else if (password !== confirmPassword) {
                return res.status(StatusCodes.BAD_REQUEST).json({error: 'Password and confirmPassword is not match'})
            }
            const response = await userService.register(req.body);
            res.status(StatusCodes.CREATED).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    loginUser: async(req, res) => {
        try {
            const { name, password } = req.body;
            //  const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
            //  const checkMail = regex.test(email);
            if(!name || !password){
                return res.status(StatusCodes.BAD_REQUEST).json({error: 'Please complete all information'});
            }
            const response = await userService.loginUser(req.body);
            res.status(StatusCodes.ACCEPTED).json(response);
         } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
         }
    },
    updateUser: async(req, res) => {
        try {
            const userId = req.params.id;
            const { email, password, confirmPassword, phone, fullName } = req.body;
            const response = await userService.updateUser(userId, req.body);
            return res.status(StatusCodes.OK).json(response)
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    updateRoleUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const response = await userService.updateRoleUser(userId);
            return res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    // updateDownRoleUser: async (req, res) => {
    //     try {
    //         const userId = req.params.id;
    //         const response = await userService.updateDownRoleUser(userId);
    //         return res.status(StatusCodes.OK).json(response);
    //     } catch (error) {
    //         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    //     }
    // },
    deleteUser: async(req, res) => {
        try {
            const userId = req.params.id;
            if(!userId){
                return res.status(StatusCodes.NOT_FOUND).json('The user is not required')
            }
            const response = await userService.deleteUser(userId);
            return res.status(StatusCodes.OK).json(response)
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    refreshToken: async(req, res) => {
        try {
            const token = req.headers.token;
            if(!token) {
                return res.status(StatusCodes.NON_AUTHORITATIVE_INFORMATION).josn({message: 'The Token is required'});
            }
            const response = await middlewareToken.refreshTokenService(token);
            return res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    forgotPassword: async(req, res) => {
        try {
            
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }
}

export default userController;
