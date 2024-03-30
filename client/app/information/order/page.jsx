'use client'
import Link from "next/link";
import { useEffect, useState } from "react";

import { getAllOrderUser } from "@/app/api/route";

const Order = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    const [orders, setOrders] = useState([]);
    
    const getOrderUser = async(accessToken) => {
        try {
            const data = await getAllOrderUser(accessToken);
            data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setOrders(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getOrderUser(accessToken);
    }, [])

    const renderIsPaid = (isPaid) => {
        return isPaid ? "Yes" : "No";
    };

//     <table className={`table-auto border-collapse ${border1} w-11/12 mt-5`}>
//     <thead>
//         <tr className="bg-red-400 text-white text-center">
//             <td className={border2}>Index</td>
//             <td className={border2}>ID</td>
//             <td className={border2}>Method</td>
//             <td className={border2}>Status</td>
//             <td className={border2}>Is Paid</td>
//             <td className={border2}>Total</td>
//             <td className={border2}></td>
//         </tr>
//     </thead>
//     <tbody>
//         {orders.map((order, index) => (
//             <tr key={order._id}>
//                 <td className={`${border1} pl-2 text-center`}>{index + 1}</td>
//                 <td className={`${border1} pl-2`}>{order._id}</td>
//                 <td className={`${border1} pl-2 text-center`}>{order.paymentType}</td>
//                 <td className={`${border1} pl-2 text-center`}>{order.status}</td>
//                 <td className={`${border1} pl-2 text-center`}>{renderIsPaid(order.isPaid)}</td>
//                 <td className={`${border1} pl-2 text-center`}>{order.totalPrice}</td>
//                 <td className={`${border1} p-2 flex justify-center`}>
//                     <Link href={`/information/order/orderdetail/${order._id}`} className="flex bg-slate-300 p-1.5 gap-1 rounded-lg text-slate-600 hover:bg-lime-700 hover:text-white w-4/5 justify-center">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
//                         </svg>
//                         Detail
//                     </Link>
//                 </td>
//             </tr>
//         ))}
//     </tbody>
// </table>
    // console.log(orders)
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
                <div>No Order . Please Order...</div>
            )}
        </div>
     );
}
 
export default Order;