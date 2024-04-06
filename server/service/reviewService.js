import { Review } from '../model/reviewModel.js';
import { Order } from '../model/orderModel.js';
import { Product } from '../model/productModel.js';

const reviewService = {
    createOriginalReview: async(data) => {
        try {
            const { userID, productID, orderID, text, rating } = data;
            const order = await Order.findById(orderID);
            if(!order) {
                throw new Error('Your Order is not exist!!');
            }
            if (order.orderBy.toString() !== userID) {
                throw new Error('You are not allowed to review this product');
            }
            // check status order
            if(order.status !== 'Delivered'){
                throw new Error('You can only rate the product after the order has been delivered');
            }

            // check product in order is exist ??
            const orderDetailItem = order.orderDetail.find(item => item.productId.toString() === productID);
            if(!orderDetailItem){
                throw new Error('The product does not exist in the order');
            }

            // console.log(order);
            const newReview = await Review.create({ userID, productID, orderID, text, rating });

            //update isReview in model Order
            order.isReview = true;
            await order.save();

            // Add _id in field review in Model Product
            await Product.findByIdAndUpdate(productID, { $push: { reviewId: newReview._id }});
            return ({
                status: 'OK',
                data: newReview
            })
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getDetailReview: async(id) => {
        try {
            const response = await Review.findById(id);
            return ({
                status: 'OK',
                data: response
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    createReponseText: async(id, userIDResponse, textResponse) => {
        try {
            const originalReview = await Review.findById(id);
            if(!originalReview){
                throw new Error("Original review is not found");
            }
            originalReview.responseText.push({
                userIDResponse: userIDResponse,
                textResponse: textResponse
            })
            
            await originalReview.save();
            return({
                status: 'OK',
                message: 'Response text created successfully',
                data: originalReview
            })
        } catch (error) {
            throw new Error(error.message);
        }
    },
    updateOriginalReview: async(id, newText) => {
        try {
            const update = await Review.findByIdAndUpdate(id, { text: newText }, { new: true});
            if (!update) {
                throw new Error('Review not found');
            }
            return({
                status: 'OK',
                message: 'Review updated successfully',
                data: update
            })
        } catch (error) {
            throw new Error(error.message);
        }
    },
    // updateReviewResponse: async(id, responseId, newText) => {
    //     try {
    //         const review = await Review.findById(id);
    //         if(!review) {
    //             throw new Error('Review is not Found');
    //         }

    //         const reviewResponse = review.responseText.findById(responseId);
    //         if(!reviewResponse){
    //             throw new Error('Review response is not Found');
    //         }

    //         console.log(reviewResponse)
    //         return({
    //             status: 'OK',
    //             message: 'Response Text Updated Successfully',
    //             data: reviewResponse
    //         });
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // },
    deleteOriginalReview: async(id) => {
        try {
            await Review.findByIdAndDelete(id);
            return({
                status: 'OK',
                message: 'Deleted Review is successfully!'
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default reviewService;
