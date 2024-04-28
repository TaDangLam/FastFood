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
    getAllReview: async() => {
        try {
            const response = await Review.find();
            return ({
                status: 'OK',
                data: response
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    calculateItemSimilarity: async () => {
        const itemUserMatrix = await reviewService.buildItemUserMatrix(); // Xây dựng ma trận đánh giá sản phẩm

        const similarityMatrix = {}; // Ma trận tương tự sản phẩm

        // Tính toán Cosine Similarity giữa các cặp sản phẩm
        const productIds = Object.keys(itemUserMatrix);

        for (let i = 0; i < productIds.length; i++) {
            const productId1 = productIds[i];
            similarityMatrix[productId1] = {};

            for (let j = 0; j < productIds.length; j++) {
                const productId2 = productIds[j];

                if (i === j) {
                    similarityMatrix[productId1][productId2] = 1; // Tương tự của một sản phẩm với chính nó là 1
                } else {
                    similarityMatrix[productId1][productId2] = reviewService.calculateCosineSimilarity(itemUserMatrix[productId1], itemUserMatrix[productId2]);
                }
            }
        }

        return similarityMatrix;
    },

    // Hàm tính toán Cosine Similarity giữa hai vector đánh giá
    calculateCosineSimilarity: (vector1, vector2) => {
        let dotProduct = 0;
        let magnitude1 = 0;
        let magnitude2 = 0;

        for (const userId in vector1) {
            if (vector2[userId]) {
                dotProduct += vector1[userId] * vector2[userId];
            }
            magnitude1 += vector1[userId] ** 2;
        }

        for (const userId in vector2) {
            magnitude2 += vector2[userId] ** 2;
        }

        if (magnitude1 === 0 || magnitude2 === 0) {
            return 0;
        }

        const similarity = dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2));
        return similarity;
    },

    // Hàm để xây dựng ma trận đánh giá sản phẩm (Item-User Matrix)
    buildItemUserMatrix: async () => {
        const itemUserMatrix = {};

        try {
            const allReviews = await Review.find();
            allReviews.forEach(review => {
                const { userID, productID, rating } = review;
                if (!itemUserMatrix[productID]) {
                    itemUserMatrix[productID] = {};
                }
                itemUserMatrix[productID][userID] = rating;
            });
            return itemUserMatrix;
        } catch (error) {
            throw new Error('Error building item-user matrix: ' + error.message);
        }
    },

    // Hàm để đề xuất sản phẩm dựa trên collaborative filtering (Item-Based CF)

    // recommendProducts: async (userId, limit) => {
    //     try {
    //         let recommendations = [];
    
    //         if (!userId) {
    //             // Nếu người dùng chưa đăng nhập, hoặc là người dùng mới không có dữ liệu đánh giá
    //             // Đề xuất các sản phẩm phổ biến
    //             recommendations = await reviewService.getPopularProducts(limit);
    //         } else {
    //             // Người dùng đã đăng nhập
    //             const userReviews = await Review.find({ userID: userId });
    //             const reviewedProductIds = userReviews.map(review => review.productID);
    
    //             if (reviewedProductIds.length === 0) {
    //                 // Nếu người dùng đã đăng nhập nhưng chưa có dữ liệu đánh giá
    //                 // Đề xuất các sản phẩm phổ biến
    //                 recommendations = await reviewService.getPopularProducts(limit);
    //             } else {
    //                 // Người dùng đã có dữ liệu đánh giá
    //                 const similarityMatrix = await reviewService.calculateItemSimilarity();
    //                 recommendations = reviewService.getRecommendations(reviewedProductIds, similarityMatrix, limit);
    //             }
    //         }
    
    //         return recommendations;
    //     } catch (error) {
    //         throw new Error('Error recommending products: ' + error.message);
    //     }
    // },
    // Hàm để đề xuất sản phẩm dựa trên collaborative filtering (Item-Based CF)
    recommendProducts: async (userId) => {
        try {
            let recommendations = [];
    
            if (!userId) {
                // Nếu người dùng chưa đăng nhập, hoặc là người dùng mới không có dữ liệu đánh giá
                // Đề xuất các sản phẩm phổ biến
                recommendations = await reviewService.getPopularProducts();
            } else {
                // Người dùng đã đăng nhập
                const userReviews = await Review.find({ userID: userId });
                const reviewedProductIds = userReviews.map(review => review.productID);
    
                if (reviewedProductIds.length === 0) {
                    // Nếu người dùng đã đăng nhập nhưng chưa có dữ liệu đánh giá
                    // Đề xuất các sản phẩm phổ biến
                    recommendations = await reviewService.getPopularProducts();
                } else {
                    // Người dùng đã có dữ liệu đánh giá
                    const similarityMatrix = await reviewService.calculateItemSimilarity();
                    recommendations = reviewService.getRecommendations(reviewedProductIds, similarityMatrix);
                }
            }
            // Lọc các đề xuất chỉ bao gồm những đề xuất có điểm số tối thiểu là 1
            recommendations = recommendations.filter(recommendation => recommendation.score >= 1);
    
            // Lấy các ObjectId của sản phẩm từ recommendations
            const productIds = recommendations.map(recommendation => recommendation.productId);
    
            // Populate các sản phẩm từ ObjectId trong productIds
            const populatedProducts = await Product.find({ _id: { $in: productIds } });
    
            // Tạo một đối tượng Map để ánh xạ _id của sản phẩm thành đối tượng sản phẩm
            const productMap = new Map(populatedProducts.map(product => [product._id.toString(), product]));
    
            // Thay thế các productId trong recommendations bằng các đối tượng sản phẩm đã populate
            const populatedRecommendations = recommendations.map(recommendation => {
                return {
                    product: productMap.get(recommendation.productId.toString()),
                    score: recommendation.score
                };
            });
    
            return populatedRecommendations;
        } catch (error) {
            throw new Error('Error recommending products: ' + error.message);
        }
    },
    getPopularProducts: async () => {
        try {
            // Lấy danh sách các sản phẩm phổ biến hoặc ngẫu nhiên
            const popularProducts = await Product.find().limit(15).sort({ sold: -1 }); // Sắp xếp theo số lượng bán được giảm dần
            return popularProducts.map(product => ({ productId: product._id, score: product.popularityScore }));
        } catch (error) {
            throw new Error('Error getting popular products: ' + error.message);
        }
    },
    // Hàm để đề xuất sản phẩm dựa trên ma trận tương tự và danh sách sản phẩm đã đánh giá
    getRecommendations: (reviewedProductIds, similarityMatrix) => {
        const recommendations = {};

        reviewedProductIds.forEach(productId1 => {
            for (const productId2 in similarityMatrix[productId1]) {
                if (productId1 !== productId2) {
                    if (!recommendations[productId2]) {
                        recommendations[productId2] = 0;
                    }
                    recommendations[productId2] += similarityMatrix[productId1][productId2];
                }
            }
        });

        const sortedRecommendations = Object.entries(recommendations)
            .sort(([, score1], [, score2]) => score2 - score1)
            .map(([productId, score]) => ({ productId, score }));

        return sortedRecommendations;
        // return sortedRecommendations.slice(0, limit);
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
