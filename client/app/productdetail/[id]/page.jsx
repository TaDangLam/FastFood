'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiShoppingCart  } from "react-icons/ci";
import { FaStar, FaRegStar, FaUserCircle  } from "react-icons/fa";
import Swal from "sweetalert2";
import { BsCurrencyDollar } from "react-icons/bs";
import Link from "next/link";

import { getAllProductById, getRecommandProduct } from "@/app/api/route";
import { addToCart } from "@/lib/features/cart/cartSlice";
import Navbar from "@/components/Navbar";
import Pagination from '@/components/Pagination';

const ProductDetail = () => {
    const product = useSelector(state => state.product.productById);
    const { id } = useParams();
    const accessToken = sessionStorage.getItem('accessToken');
    const dispatch = useDispatch();
    const [showReview, setShowReview] = useState(false);
    const [selectedTab, setSelectedTab] = useState("Description");
    const firstDesc = product.desc.split('.')[0];
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;                                                      // Số sản phẩm trên mỗi trang
    const indexOfLastProduct = currentPage * productsPerPage;                       // chỉ mục cuối
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;               // chỉ mục đầu
    const currentProducts = product.reviewId.slice(indexOfFirstProduct, indexOfLastProduct);
    // --------------------Paginate Product Recommand--------------------------
    const [productRecommand, setProductRecommand] = useState([]);
    const [currentPage2, setCurrentPage2] = useState(1);
    const productsPerPage2 = 4;                                                
    const indexOfLastProduct2 = currentPage2 * productsPerPage2;                      
    const indexOfFirstProduct2 = indexOfLastProduct2 - productsPerPage2;             
    const currentProducts2 = productRecommand.slice(indexOfFirstProduct2, indexOfLastProduct2);

    useEffect(() => {
        getAllProductById(id, dispatch)
        fetchProductRecommand(accessToken);
    }, [id])

    const fetchProductRecommand = async(accessToken) => {
        try {
            const data = await getRecommandProduct(accessToken);
            setProductRecommand(data);
        } catch (error) {
            console.log(error)
        }
    }

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

    console.log(accessToken);
    return ( 
        <div className="margin-component mt-[31px] flex gap-5 relative">
            <div className="flex flex-col h-full w-9/12 border-r-2 pr-3 border-b-2 pb-3 gap-2">
                <div className="flex flex-col w-full h-5/6">
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
                            <li className={`px-14 py-2 cursor-pointer border hover:bg-[#fab348] hover:text-white duration-500 ${selectedTab === 'Description' && 'bg-[#fab348] text-white'}`} onClick={() => handleShowReview('Description')}>Description</li>
                            <li className={`px-14 py-2 cursor-pointer border hover:bg-[#fab348] hover:text-white duration-500 ${selectedTab === 'Review' && 'bg-[#fab348] text-white'}`} onClick={() => handleShowReview('Review')}>Review ({`${product.reviewId.length}`})</li>
                        </ul>
                        {showReview ? (
                            <div className="flex flex-col w-full h-5/6 gap-5 py-8 px-10 border">
                                {product.reviewId?.length > 0 ? (
                                        <div className="flex flex-col w-full gap-5">
                                            {currentProducts.map(review => (
                                                <div className=" flex w-full pb-6 border-b-2">
                                                    <div className="flex justify-center h-full w-1/12 text-4xl">
                                                        <FaUserCircle className="h-full"/>
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
                                            <div className="flex items-center justify-start">
                                                    <Pagination 
                                                        totalProduct={product.reviewId?.length} 
                                                        productsPerPage={productsPerPage} 
                                                        setCurrentPage={setCurrentPage}
                                                        currentPage={currentPage}
                                                    />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex h-full w-full">
                                            <img src="/noreview.png" alt="Picute No Review" className="w-6/12"/>
                                        </div>
                                )} 
                            </div>
                        ) : (
                            <div className="p-10 w-full h-5/6 border">
                                <div className="text-xl font-semibold">Description</div>
                                <div className="pt-5">{product.desc}</div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col w-full gap-2 h-1/6 pt-10">
                    <div className="w-full h-1/2 font-semibold text-xl">Outstanding Products</div>
                    <div className="flex flex-col gap-5 w-full h-1/2">
                        <div className="grid grid-cols-4 w-full gap-3">
                            {currentProducts2?.map(product => (
                                <Link href={`/productdetail/${product.product._id}`} className='relative h-full w-full border-2 hover:shadow-xl duration-300 hover:opacity-80'>
                                    <div className='bg-white rounded-pd w-full h-full p-5'>
                                            <div className='w-full h-3/6'><img src={`${process.env.NEXT_PUBLIC_API_UPLOAD}/${product.product.name}/${product.product.images[0]}`}  alt="product-image" className='h-full w-full object-contain rounded-pd '/></div>
                                            <div className='h-2/6 w-full text-lg font-semibold '>{product.product.name}</div>
                                            <div className=' h-1/6 w-full mb-0 flex items-center justify-between'>
                                                <div className='flex font-semibold text-2xl text-[#ffa460] '>{product.product.price} <BsCurrencyDollar /></div>
                                                <div className=''><span className="font-semibold">Sold</span> : {product.product.sold}</div>
                                            </div>
                                    </div>
                                    {product?.product.status === 'SoldOut' && (
                                        <div className="absolute top-0 right-0 w-[120px] h-[150px]">
                                            <img src='/corner-sold-out-ribbon-banner-260nw-1325587067-Photoroom.png-Photoroom.png' className="w-full h-full"/>
                                        </div>
                                    )}
                            </Link>
                            ))}
                        </div>
                        <div className="w-full">
                            <Pagination 
                                totalProduct={productRecommand.length} 
                                productsPerPage={productsPerPage2} 
                                setCurrentPage={setCurrentPage2}
                                currentPage={currentPage2}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-3/12 h-full sticky top-24">
                <Navbar />
            </div>
        </div>
    );
}
 
export default ProductDetail;
