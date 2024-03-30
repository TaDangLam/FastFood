'use client'
import Link from "next/link";
import { useEffect, useState } from "react";

import { getAllOrderPendingUser } from "@/app/api/route";

const OrderPending = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    const [orders, setOrders] = useState([]);
    
    const getOrderUser = async(accessToken) => {
        try {
            const data = await getAllOrderPendingUser(accessToken);
            data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setOrders(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getOrderUser(accessToken);
    }, [])


    return ( 
        <div className="w-full h-full p-2">
            {orders && orders.length > 0 ? (
                <div className="flex flex-col gap-5 w-full h-full">
                    {orders.map(order => (
                        <div className="flex flex-col gap-5 w-full h-full border-[3px] bg-slate-100 rounded-md py-3 px-6">
                            <div className="flex items-center justify-between border-b-2">
                                <div className="h-full"><span className="font-bold text-lg text-[#ff6a6d]">OrderID:</span> <span className="font-semibold">{order._id}</span></div>
                                <div className="h-full"><span className="font-bold text-lg text-[#ff6a6d]">Status:</span> <span className="font-semibold">{order.status}</span></div>
                            </div>
                            {order.orderDetail.map(ord => (
                                <Link href={`/information/order/orderdetail/${order._id}`} className="flex items-center w-full border-b-2">
                                    <div className="w-1/12"><img src={`${process.env.NEXT_PUBLIC_API_UPLOAD}/${ord.productId.name}/${ord.productId.images[0]}`} alt="product-images" className="object-cover w-full h-full"/></div>
                                    <div className="w-10/12 flex flex-col gap-1 px-5">
                                        <div className="w-full h-1/2 text-lg">{ord.productId.name}</div>
                                        <div className="w-full h-1/2"><span className="font-semibold">Quantity:</span> {ord.quantity}</div>
                                    </div>
                                    <div className="w-1/12 font-semibold text-right">$ {ord.totalPriceProduct}</div>
                                </Link>
                            ))}
                            <div className="w-full flex gap-2 justify-end items-center"><span className="font-semibold">Payment: </span><span className="font-semibold text-2xl text-[#ff6a6d]">{order.totalPrice} $</span></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>No Order Pending. Please Order...</div>
            )}
    </div>
    );
}
 
export default OrderPending;