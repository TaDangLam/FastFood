'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { FaSearch } from "react-icons/fa";

import { getAllOrderUser, getAllOrderPendingUser, getAllOrderProcessingUser, getAllOrderDeliveredUser, getAllOrderCancleUser, updateStatusOrderToDelivered, createOriginalReview, searchOrderForCustomer } from "@/app/api/route";

const Order = () => {
    const router = useRouter();
    const accessToken = sessionStorage.getItem('accessToken');
    const path = useSearchParams().get('path');
    const [orders, setOrders] = useState([]);
    const [searchOrders, setSearchOrders] = useState('');

    const getAllOrderForUser = async(accessToken) => {
        try {
            const data = await getAllOrderUser(accessToken);
            data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setOrders(data);
        } catch (error) {
            console.log(error)
        }
    }

    const getAllOrderPending = async(accessToken) => {
        try {
            const data = await getAllOrderPendingUser(accessToken);
            data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setOrders(data);
        } catch (error) {
            console.log(error)
        }
    }

    const getAllOrderProcessing = async(accessToken) => {
        try {
            const data = await getAllOrderProcessingUser(accessToken);
            data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setOrders(data);
        } catch (error) {
            console.log(error)
        }
    }

    const getAllOrderDelivered= async(accessToken) => {
        try {
            const data = await getAllOrderDeliveredUser(accessToken);
            data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setOrders(data);
        } catch (error) {
            console.log(error)
        }
    }

    const getAllOrderCancle= async(accessToken) => {
        try {
            const data = await getAllOrderCancleUser(accessToken);
            data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setOrders(data);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        switch (path) {
            case 'All':
                getAllOrderForUser(accessToken);
                break;
            case 'Pending':
                getAllOrderPending(accessToken);
                break;
            case 'Processing':
                getAllOrderProcessing(accessToken);
                break;
            case 'Delivered':
                getAllOrderDelivered(accessToken);
                break;
            case 'Cancel':
                getAllOrderCancle(accessToken);
                break;
            default:
                getAllOrderForUser(accessToken);
                break;
        }
    }, [path]);

    const updateToDelivered = async(id, accessToken) => {
        Swal.fire({
            title: "Are you Recevied Order?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
            }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await updateStatusOrderToDelivered(id, accessToken);
                    Swal.fire({
                        title: "Success!",
                        icon: "success"
                    });
                    router.push('/information/order?path=Delivered')
                } catch (error) {
                    console.log(error)
                    Swal.fire({
                        title: "Error!",
                        text: `${error}`,
                        icon: "error"
                    });
                }
            }
        });
    }
    
    const showReviewInput = (id, accessToken) => {
        Swal.fire({
            title: 'Write your review',
            html:
            `<input id="swal-input1" class="swal2-input px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" placeholder="Your Review">` +
            `<select id="swal-input2" class="swal2-input px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 mt-5">
                <option value="1">1 star</option>
                <option value="2">2 stars</option>
                <option value="3">3 stars</option>
                <option value="4">4 stars</option>
                <option value="5">5 stars</option>
            </select>`,
            focusConfirm: false,
            preConfirm: async() => {
                const text = document.getElementById('swal-input1').value;
                const rating = document.getElementById('swal-input2').value;

                if (text) {
                    const order = orders.find(order => order._id === id);
            
                    if (order) {
                        try {
                            for (const detail of order.orderDetail) {
                                const reviewData = {
                                    userID: order.orderBy._id,
                                    productID: detail.productId._id,
                                    orderID: order._id,
                                    text,
                                    rating
                                };
            
                                await createOriginalReview(reviewData, accessToken);
                            }
            
                            Swal.fire({
                                title: "Success!",
                                icon: "success"
                            });
                            window.location.reload();
                        } catch (error) {
                            console.log(error);
                            Swal.fire({
                                title: "Error!",
                                text: `${error}`,
                                icon: "error"
                            });
                        }
                    } else {
                        console.log("Order is Not Found");
                    }
                }
                // try {
                //     const newData = {text, rating, }
                // } catch (error) {
                //     console.log(error);
                //     Swal.fire({
                //     title: "Error!",
                //     text: `${error}`,
                //     icon: "error"
                // });
                // }
            }
        });
    }
    
    const handleSubmitSearch = async(e) => {
        e.preventDefault();
        try {
            const newSearch = await searchOrderForCustomer(searchOrders, accessToken);
            setOrders(newSearch);
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${error.response.data.error}`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    // console.log(orders);
    return (
        <div className="flex flex-col gap-5 w-full h-full p-2">
            <div className="">
                <form
                    onSubmit={handleSubmitSearch}
                    className="flex w-1/2 h-full relative"
                >
                    <input
                        type="text"
                        value={searchOrders}
                        onChange={e => setSearchOrders(e.target.value)}
                        placeholder="Search for Order (By ID)" 
                        className="appearance-none block w-full h-full bg-[#f1f5f9] text-gray-700 border border-gray-100 rounded-l-xl rounded-r-xl p-4 focus:outline-none focus:ring-1 focus:ring-slate-300"
                    />
                    <button
                        type="submit"
                        className="bg-slate-100 text-black rounded-r-xl h-full p-4 flex items-center justify-center absolute right-0 border-l-2"
                    >
                        <FaSearch />
                    </button>
                </form>
            </div>
            {orders && orders.length > 0 ? (
                <div className="flex flex-col gap-5 w-full h-full">
                    {orders.map(order => (
                        <div key={order._id} className="flex flex-col gap-5 w-full h-full border-[3px] bg-slate-100 rounded-md py-3 px-6">
                            <div className="flex items-center justify-between border-b-2">
                                <div className="h-full"><span className="font-bold text-lg text-[#ff6a6d]">OrderID:</span> <span className="font-semibold">{order._id}</span></div>
                                <div className="h-full"><span className="font-bold text-lg text-[#ff6a6d]">Status:</span> <span className="font-semibold">{order.status}</span></div>
                            </div>
                            {order.orderDetail.map(ord => (
                                <Link href={`/information/order/orderdetail/${order._id}`} className="flex items-center w-full border-b-2">
                                    <div className="w-1/12"><img src={`${process.env.NEXT_PUBLIC_API_UPLOAD}/${ord.productId.name}/${ord.productId.images[0]}`} alt="product-images" className="object-cover w-full h-full"/></div>
                                    <div className="w-10/12 flex flex-col gap-2.5 px-5 py-2">
                                        <div className="w-full h-1/3 text-xl font-semibold">{ord.productId.name}</div>
                                        <div className="w-full h-1/3"><span className="font-semibold">Quantity:</span> {ord.quantity}</div>
                                        <div className="w-full h-1/3 text-sm"><span className="font-semibold">ID: </span><span>{ord.productId._id}</span></div>
                                    </div>
                                    <div className="w-1/12 font-semibold text-right">$ {parseFloat(ord.totalPriceProduct).toFixed(2)}</div>
                                </Link>
                            ))}
                            <div className="w-full flex gap-2 justify-end items-center"><span className="font-semibold">Payment: </span><span className="font-semibold text-2xl text-[#ff6a6d]">{order.totalPrice} $</span></div>
                            {order.status === 'Processing' && (
                                <div className="w-full flex gap-3 justify-end items-center">
                                    <div onClick={() => updateToDelivered(order._id, accessToken)} className="flex items-center justify-center font-semibold bg-[#ff8f6e] w-1/6 hover:opacity-70 text-lg text-white p-1 rounded-xl cursor-pointer duration-300">Received</div>
                                </div>
                            )}
                            {order.status === 'Delivered' && !order.isReview && (
                                <div className="w-full flex gap-3 justify-end items-center">
                                    <div onClick={() => showReviewInput(order._id, accessToken)} className="flex items-center justify-center font-semibold bg-[#ffb170] w-1/6 hover:opacity-70 text-lg text-white p-1 rounded-xl cursor-pointer duration-300">Review</div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center">
                    <img src="/noOrderCustomer.jpg" alt="images" className=""/>
                </div>
            )}
        </div>
     );
}
 
export default Order;