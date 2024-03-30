import { StatusCodes} from 'http-status-codes';

import addressService from '../service/addressService.js';

const AddressController = {
    getAllAddress: async(req, res) => {
        try {
            const userId = req.user.payload.id;
            // console.log("req: ", req);
            // console.log("------------------------------------------------------------------");
            // console.log("req.user: ", req.user);
            // console.log("------------------------------------------------------------------");
            // console.log("userId: ", userId);
            const response = await addressService.getAllAddress(userId);
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    addAddress: async(req, res) => {
        try {
            const { userId } = req.params;
            const { street, city, province } = req.body;
            if( !street || !city || !province ) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please input all required fields in Address' });
            }
            const response = await addressService.addAddress(userId, req.body);
            res.status(StatusCodes.CREATED).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    updateAddress: async(req, res) => {
        try {
            const { aid } = req.params;
            const { street, city, province } = req.body;
            const response = await addressService.updateAddress(aid, req.body);
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    getDetailAddress: async(req, res) => {
        try {
            const { aid } = req.params;
            const response = await addressService.getDetailAddress(aid);
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    deleteAddress: async(req, res) => {
        try {
            const { aid } = req.params;
            const response = await addressService.deleteAddress(aid);
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
}

export default AddressController;
