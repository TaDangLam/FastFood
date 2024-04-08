'use client'
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { BsCurrencyDollar } from "react-icons/bs";

// import Spinner1 from "@/components/spinner1";
import { getOrderDetail } from "@/app/api/route";

const OrderDetail = () => {
    const { id } = useParams();
    const accessToken = sessionStorage.getItem('accessToken');
    const [user, setUser] = useState(null);
    const [orderDetail, setOrderDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const getOrderdetail = async() => {
        try {
            const data = await getOrderDetail(id, accessToken);
            setOrderDetail(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getOrderdetail();
    },[]);

    console.log(orderDetail);

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

    const renderIsPaid = (isPaid) => {
        return isPaid ? "Yes" : "No";
    };

    return ( 
        <div>
            {loading ? (
                <div className="text-center py-40"><Spinner1 /></div>
            ) : (
                <div className="flex flex-col gap-5 w-full h-full">
                    <div className="bg-slate-50 w-full flex justify-between rounded-md">
                    <div className="p-2 flex gap-2"><span className="font-bold">Order Detail:</span> <span className="text-[#6da2f7] cursor-pointer ">#{orderDetail?._id}</span></div>
                    <div className="p-2 flex gap-2"><span className="font-bold">Order At:</span> <span className="">{formatDateTime(orderDetail?.createdAt)}</span></div>
                </div>
            <div className=" flex gap-4 w-full ">
                <div className="flex flex-col gap-3 bg-slate-50 w-2/3 p-4 rounded-md">
                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <span className="font-bold">Information User</span>
                    </div>
                    <div className="flex gap-2"><span className="font-semibold">Name:</span> <span>{orderDetail?.orderBy?.fullName}</span></div>
                    <div className="flex gap-2"><span className="font-semibold">Phone:</span> <span>{orderDetail?.orderBy?.phone}</span></div>
                    <div className="flex gap-2"><span className="font-semibold">Street:</span> <span>{orderDetail?.address?.street}</span></div>
                    <div className="flex gap-2"><span className="font-semibold">City:</span> <span>{orderDetail?.address?.city}</span></div>
                    <div className="flex gap-2"><span className="font-semibold">Province:</span> <span>{orderDetail?.address?.province}</span></div>
                </div>
                <div className="flex flex-col gap-3 bg-slate-50 w-1/3 p-4 rounded-md ">
                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                        </svg>
                        <span className="font-bold">Payment</span>
                    </div>
                    <div className="flex gap-1 ml-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 7.629A3 3 0 009.017 9.43c-.023.212-.002.425.028.636l.506 3.541a4.5 4.5 0 01-.43 2.65L9 16.5l1.539-.513a2.25 2.25 0 011.422 0l.655.218a2.25 2.25 0 001.718-.122L15 15.75M8.25 12H12m9 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="flex gap-2"><span className="font-semibold">Method:</span> {orderDetail?.paymentType}</span>
                    </div>
                    <div className="flex gap-1 ml-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                        </svg>
                        <span className="flex gap-2"><span className="font-semibold">Paid:</span> {renderIsPaid(orderDetail?.isPaid)}</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-6 bg-slate-50 w-full p-4 rounded-md">
                <div className="flex gap-1 items-center w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <span className="font-bold">Information Product</span>
                </div>

                {orderDetail?.orderDetail.map(item => (
                    <div className="flex w-full gap-4 px-2 py-1 border-b-2 border-slate-200">
                        <div className=" w-2/12 ">
                            <img src={`${process.env.NEXT_PUBLIC_API_UPLOAD}/${item.productId?.name}/${item.productId?.images[0]}`} alt="img-Product" />
                        </div>

                        <div className="flex flex-col  gap-5 w-8/12 p-2">
                            <div className="font-semibold">{item.productId?.name}</div>
                            <div><span className="font-semibold">Amount: </span><span>{item.quantity}</span></div>
                            <div className="text-sm"><span className="font-semibold">ID</span>: <span>{item.productId?._id}</span></div>
                        </div>

                        <div className="flex w-2/12 p-2">
                            <span >{Number(item.totalPriceProduct).toFixed(2)}</span>
                            <span><BsCurrencyDollar /></span>
                        </div>
                    </div>
                    
                ))}
                <div className="flex w-full justify-between py-2 px-16 border-b-2 border-rose-500 ">
                    <div className="text-2xl font-semibold">Total:</div>
                    <div className="flex"><span className="text-2xl font-semibold text-red-700">{Number(orderDetail?.totalPrice).toFixed(2)}</span> <span><BsCurrencyDollar /></span></div>
                </div>
            </div>
                    
                </div>
            )}
        </div>
     );
}
 
export default OrderDetail;