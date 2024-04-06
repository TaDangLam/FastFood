'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiShoppingCart  } from "react-icons/ci";
import { FaStar, FaRegStar, FaUserCircle  } from "react-icons/fa";
import Swal from "sweetalert2";

import { getAllProductById, getReviewById } from "@/app/api/route";
import { addToCart } from "@/lib/features/cart/cartSlice";
import Navbar from "@/components/Navbar";

const ProductDetail = () => {
    const product = useSelector(state => state.product.productById);
    const { id } = useParams();
    const dispatch = useDispatch();
    const [showReview, setShowReview] = useState(false);
    const [selectedTab, setSelectedTab] = useState("Description");
    const firstDesc = product.desc.split('.')[0];

    useEffect(() => {
        getAllProductById(id, dispatch)
    }, [id])

    const handleShowReview = (tab) => {
        if (tab !== selectedTab) { 
            setShowReview(!showReview);
            setSelectedTab(tab); 
        };
    }

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString)
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const addLeadingZero = (value) => (value < 10 ? `0${value}` : value);

        const formattedDateTime1 = `${addLeadingZero(hours)}:${addLeadingZero(minutes)}, ${day}/${month}/${year}`;
        return formattedDateTime1;
    }

    const renderRatingStar = () => {
        let stars = []
        if(!product.reviewId || product.reviewId.length === 0) {
        // Nếu không có đánh giá, hiển thị số sao từ product.rate
            for (let i = 1; i <= product.rate; i++) {
                stars.push(<FaStar key={i} className="text-[#ffc139]"/>);
            }
            
        } else {
            // Tính điểm trung bình từ tất cả các đánh giá
            let totalRating = 0;
            
            product.reviewId.map(reviewId => {
                return totalRating += reviewId.rating;
            });
            const average = Math.floor(totalRating / product.reviewId.length);
            for (let i = 1; i <= average; i++) {
                stars.push(<FaStar className="text-[#ffc139]"/>);
            }
            const remainStar = 5 - average;
            for (let i = 1; i <= remainStar; i++) {
                stars.push(<FaRegStar className="text-[#ffc139]"/>);
            }
        }
        return stars;
    }

    const renderStarReview = (value) => {
        const star = [];
        const remain = 5 - value;
        for(let i = 1; i <= value; i++){
            star.push(<FaStar className="text-[#ffc139]"/>);
        }
        for(let i = 1; i <= remain; i++){
            star.push(<FaRegStar className="text-[#ffc139]"/>);
        }
        return star;
    }

    const handleAddToCart = async(product) => {
        await dispatch(addToCart(product));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Product Has Been Added to Cart",
          showConfirmButton: false,
          timer: 1500
        });
      }

    // console.log(product);
    return ( 
        <div className="margin-component mt-[31px] flex gap-5">
            <div className="flex flex-col h-full w-9/12 border-r-2 pr-3 border-b-2 pb-3">
                <div className="flex w-full h-1/2">
                    <div className="flex items-center relative w-5/12 h-full border-2 ">
                        <img 
                            src={`${process.env.NEXT_PUBLIC_API_UPLOAD}/${product.name}/${product.images[0]}`} 
                            alt="photos"
                            className="w-full h-full object-cover"
                        />
                        {product?.status === 'SoldOut' && (
                            <div className="absolute top-0 right-0 w-[120px] h-[150px]">
                                <img src='/corner-sold-out-ribbon-banner-260nw-1325587067-Photoroom.png-Photoroom.png' className="w-full h-full"/>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-5 w-7/12 h-full px-16 py-5">
                        <div className="flex flex-col gap-3.5 w-full h-1/4">
                            <div className="flex items-center gap-2 w-full h-1/3">{renderRatingStar()} ( {`${product.reviewId.length} customer review`} )</div>
                            <div className="w-full h-1/3 text-3xl font-semibold">{product.name}</div>
                            <div className="w-full"><span className="font-semibold">Sold</span> : {product.sold}</div>
                            <div className="w-full h-1/3 text-3xl font-semibold text-[#fab348]">$ {product.price}</div>
                        </div>
                        <div className="flex flex-col gap-5 w-full h-1/4 py-2">
                            <div><span className="font-semibold">ID Product</span>: <span className="text-gray-500">{id}</span></div>
                            <div className="font-extralight">{firstDesc}</div>
                        </div>
                        <div className="w-full h-1/4">
                            {product?.status === 'SoldOut' ? (
                                <button
                                    className="flex items-center gap-3 bg-[#cdcdcd] text-white px-6 py-3 rounded-full font-semibold duration-300"
                                >
                                    <span className="text-2xl font-semibold"><CiShoppingCart /></span>
                                    ADD TO CART
                                </button>
                            ) : (
                                <button
                                    className="flex items-center gap-3 bg-[#fab348] hover:bg-[#ffc139] text-white px-6 py-3 rounded-full font-semibold duration-300"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    <span className="text-2xl font-semibold"><CiShoppingCart /></span>
                                    ADD TO CART
                                </button>
                            )}
                        </div>
                        <div className="flex flex-col w-full h-1/4 ">
                            <div className="w-full h-4/6 text-lg font-medium pt-5">Safe Checkout</div>
                            <div className="flex items-center gap-4 w-full h-2/6">
                                <img src="/paypallogo.png" alt="logo-paypal" className="w-1/3 h-full"/>
                                <img src="/MasterCard_Logo.svg.png" alt="logo-mastercard" className="w-1/3 h-full"/>
                                <img src="/momologo.jpg" alt="logo-momo" className="w-1/3 h-full"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-1/2">
                    <ul className="flex w-full h-1/6">
                        <li className={`px-14 py-2 cursor-pointer border hover:bg-[#fab348] hover:text-white ${selectedTab === 'Description' && 'bg-[#fab348] text-white'}`} onClick={() => handleShowReview('Description')}>Description</li>
                        <li className={`px-14 py-2 cursor-pointer border hover:bg-[#fab348] hover:text-white ${selectedTab === 'Review' && 'bg-[#fab348] text-white'}`} onClick={() => handleShowReview('Review')}>Review ({`${product.reviewId.length}`})</li>
                    </ul>
                    {showReview ? (
                        <div className="flex flex-col w-full h-5/6 gap-5 p-10 border">
                                {product.reviewId.map(review => (
                                    <div className=" flex w-full pb-6 border-b-2">
                                        <div className="flex justify-center h-full w-1/12 text-4xl">
                                            <FaUserCircle className="h-full w"/>
                                        </div>
                                        <div className="flex flex-col gap-3.5 h-full w-11/12">
                                            <div className="w-full text-base font-bold">{review.userID?.name}</div>
                                            <div className="flex flex-col gap-2.5 w-full">
                                                <div className="flex gap-1 w-full">{renderStarReview(review.rating)}</div>
                                                <div className="w-full">{formatDateTime(review.createdAt)}</div>
                                            </div>
                                            <div className="w-full">{review.text}</div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <div className="p-10 w-full h-5/6 border">
                            <div className="text-xl font-semibold">Description</div>
                            <div className="pt-5">{product.desc}</div>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-3/12 h-full"><Navbar /></div>
        </div>
     );
}
 
export default ProductDetail;
