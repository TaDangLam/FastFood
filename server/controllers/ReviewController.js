import { StatusCodes } from 'http-status-codes';
import reviewService from '../service/reviewService.js';

const ReviewController = {
    createOriginalReview: async(req, res) => {
        try {
            const response = await reviewService.createOriginalReview(req.body);
            res.status(StatusCodes.CREATED).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    getDetailReview: async(req, res) => {
        try {
            const { id } = req.params;
            const response = await reviewService.getDetailReview(id);
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    getAllReview: async(req, res) => {
        try {
            const response = await reviewService.getAllReview();
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    recommendProducts: async (req, res) => {
        try {
            // const userId  = req.user.payload.id;
            let userId;
        
            if (req.user && req.user.payload && req.user.payload.id) {
                userId = req.user.payload.id;
            } else {
                // Nếu không có thông tin người dùng đã đăng nhập, đặt userId là null
                userId = null;
            }
            // Gọi hàm recommendProducts từ reviewService
            const limit = parseInt(req.query.limit, 10) || 10;
            const recommendations = await reviewService.recommendProducts(userId, limit);

            // Trả về danh sách các sản phẩm đề xuất
            res.status(StatusCodes.OK).json(recommendations);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    createReponseText: async(req, res) => {
        try {
            const { id } = req.params;
            const { userIDResponse, textResponse } = req.body
            const response = await reviewService.createReponseText(id, userIDResponse, textResponse);
            res.status(StatusCodes.CREATED).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    updateOriginalReview: async(req, res) => {
        try {
            const { id } = req.params;
            const { text } = req.body
            const response = await reviewService.updateOriginalReview(id, text);
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    deleteOriginalReview: async(req, res) => {
        try {
            const { id } = req.params;
            const response = await reviewService.deleteOriginalReview(id);
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }
}

export default ReviewController;
