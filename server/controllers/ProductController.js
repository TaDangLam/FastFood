import { StatusCodes} from 'http-status-codes';

import productService from '../service/productService.js';

const productController = {
    getAllProduct: async(req, res) => {
        try {
            // const { limit, page } = req.query;
            // const response = await productService.getAllProduct(Number(limit) || 8, Number(page) || 0);
            const response = await productService.getAllProduct();
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    searchProduct: async(req, res) => {
        try {
            const { keyword } = req.query;
            const response = await productService.searchProduct(keyword);
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    getDetailProduct: async(req, res) => {
        try {
            const { pid } = req.params;
            const response = await productService.getDetailProduct(pid);
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    getProductByCategory: async(req, res) => {
        try {
            const { cid } = req.params;
            const response = await productService.getProductByCategory(cid);
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    getFewProductByCategory: async(req, res) => {
        try {
            const { cid } = req.params;
            const response = await productService.getFewProductByCategory(cid);
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    createProduct: async(req, res) => {
        try {
            const { name, price, desc, categoryId, images } = req.body;
            if( !name || !price || !desc || !categoryId || images?.length === 0){
                return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Please input all required fields and upload at least one image' });
            }
            const response = await productService.createProduct(req.body);
            return res.status(StatusCodes.CREATED).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    updateProduct: async(req, res) => {
        try {
            const { pid } = req.params;
            const newData = req.body;
            const updateProduct = await productService.updateProduct(pid, newData);
            res.status(StatusCodes.OK).json(updateProduct);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    updateStatusProduct: async(req, res) => {
        try {
            const { pid } = req.params;
            const resposne = await productService.updateStatusProduct(pid);
            res.status(StatusCodes.OK).json(resposne);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    },
    deleteProduct: async(req, res) => {
        try {
            const { pid } = req.params;
            const response = await productService.deleteProduct(pid);
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }
}

export default productController;
