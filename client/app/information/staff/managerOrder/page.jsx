'use client'
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

import { getAllOrderPendingAdmin, getAllOrderProcessingAdmin, getAllOrderDeliveredAdmin, getAllOrderCancleAdmin, updateStatusOrderToProcessing, updateStatusOrderToCancel } from "@/app/api/route";

const ManagerOrder = () => {
    const status = useSearchParams().get('status');
    const router = useRouter();
    const accessToken = sessionStorage.getItem('accessToken');
    const [orders, setOrders] = useState([]);


    const handleChangeParams = (params) => {
        router.push(`/information/staff/managerOrder?status=${params}`)
    }

    const getAllOrderPending = async(accessToken) => {
        try {
            const data = await getAllOrderPendingAdmin(accessToken);
            data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getAllOrderProcessing = async(accessToken) => {
        try {
            const data = await getAllOrderProcessingAdmin(accessToken);
            data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getAllOrderDelivered = async(accessToken) => {
        try {
            const data = await getAllOrderDeliveredAdmin(accessToken);
            data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getAllOrderCancel = async(accessToken) => {
        try {
            const data = await getAllOrderCancleAdmin(accessToken);
            data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        switch (status) {
            case 'Pending':
                getAllOrderPending(accessToken);
              break;
              case 'Processing':
                getAllOrderProcessing(accessToken);
              break;
              case 'Delivered':
                getAllOrderDelivered(accessToken);
              break;  
            default:
                getAllOrderCancel(accessToken);
              break;
          }
    }, [accessToken, status])
    
    const updateToProcessing = async(id, accessToken) => {
        Swal.fire({
            title: "Are you Accept Order To Processing?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
            }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await updateStatusOrderToProcessing(id, accessToken);
                    Swal.fire({
                        title: "Success!",
                        icon: "success"
                    });
                    router.push('/information/staff/managerOrder?status=Processing')
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

    const updateToCancel = async(id, accessToken) => {
        Swal.fire({
            title: "Are you Reject Order To Cancel?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
            }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await updateStatusOrderToCancel(id, accessToken);
                    Swal.fire({
                        title: "Success!",
                        icon: "success"
                    });
                    router.push('/information/staff/managerOrder?status=Cancel')
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

    return ( 
        <div className="flex flex-col gap-3 px-2">
            <div className="flex gap-3 w-1/4">
                <div onClick={() => handleChangeParams('Pending')} className="h-full bg-[#ff676d] text-white font-semibold p-2 rounded-xl w-1/2 text-center cursor-pointer duration-500 hover:opacity-85">Pending</div>
                <div onClick={() => handleChangeParams('Processing')} className="h-full bg-[#ff676d] text-white font-semibold p-2 rounded-xl w-1/2 text-center cursor-pointer duration-500 hover:opacity-85">Processing</div>
                <div onClick={() => handleChangeParams('Delivered')} className="h-full bg-[#ff676d] text-white font-semibold p-2 rounded-xl w-1/2 text-center cursor-pointer duration-500 hover:opacity-85">Delivered</div>
                <div onClick={() => handleChangeParams('Cancel')} className="h-full bg-[#ff676d] text-white font-semibold p-2 rounded-xl w-1/2 text-center cursor-pointer duration-500 hover:opacity-85">Cancel</div>
            </div>
            <div className="flex gap-3 w-1/3 border-b-2 border-[#ff676d]"></div>
            <div className="">
                {orders && orders.length > 0 ? (
                    <div className="flex flex-col gap-5 w-full h-full">
                        {orders.map(order => (
                            <div className="flex flex-col gap-5 w-full h-full border-[3px] bg-slate-100 rounded-md py-3.5 px-6">
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
                                        <div className="w-1/12 font-semibold text-right">$ {parseFloat(ord.totalPriceProduct).toFixed(2)}</div>
                                    </Link>
                                ))}
                                <div className="w-full flex gap-2 justify-end items-center">
                                    <span className="font-semibold">Payment: </span><span className="font-semibold text-2xl text-[#ff6a6d]">{order.totalPrice} $</span>
                                </div>
                                {order.status === 'Pending' && (
                                    <div className="w-full flex gap-3 justify-end items-center">
                                        <div onClick={() => updateToCancel(order._id, accessToken)} className="flex items-center justify-center font-semibold bg-red-700 w-1/6 hover:opacity-70 text-lg text-white p-1 rounded-xl cursor-pointer duration-300">Cancel</div>
                                        <div onClick={() => updateToProcessing(order._id, accessToken)} className="flex items-center justify-center font-semibold bg-green-700 w-1/6 hover:opacity-70 text-lg text-white p-1 rounded-xl cursor-pointer duration-300">Accepting</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>No Order.......</div>
                )}
            </div>
        </div>
    );
}
 
export default ManagerOrder;