'use client'
import Swal from "sweetalert2";
import { format } from 'date-fns';
import { useEffect, useState } from "react";
import Link from "next/link";
import { BsCurrencyDollar } from "react-icons/bs";
import { MdOutlineBorderColor } from "react-icons/md";

// import Spinner1 from "@/components/spinner1";
import { getAllOrderAdmin } from "@/app/api/route";

const OrderPage = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const border1 = 'border border-slate-400';
    const border2 = border1 + ' font-semibold text-xl';

    const getAllOrder = async() => {
        try {
            const data = await getAllOrderAdmin(accessToken);
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllOrder();
    }, [])
    console.log(orders);

    const handleDeleteOrder = async(id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will Delete Order This Order",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(result => {
            if(result.isConfirmed) {
                axios.delete(apiOrder + `/delete/${id}`, { headers: {token: `Bearer ${user?.accessToken}`}});
                window.location.reload();
            }
        });
    }

    return (
        <div className="flex flex-col">
            {loading ? (
                <div className="text-center py-40"><Spinner1 /></div>
            ) : (
                <div className="w-full h-full">
                    <div className="text-[#4b6cb7] text-3xl font-bold w-full h-1/6">Order</div>
                    <table className={`table-auto border-collapse ${border1} w-full h-5/6 mt-5`}>
                        <thead>
                            <tr className="bg-[#4b6cb7] text-white text-center">
                                <td className={border2}>Index</td>
                                <td className={border2}>OrderBy</td>
                                <td className={border2}>OrderId</td>
                                {/* <td className={border2}>Method</td>
                                <td className={border2}>IsPaid</td> */}
                                <td className={border2}>OrderAt</td>
                                <td className={border2}>Status</td>
                                <td className={border2}>Total</td>
                                <td className={border2}></td>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order._id} className="">
                                    <td className={`${border1} pl-2 text-center`}>{index + 1}</td>
                                    <td className={`${border1} pl-2`}>{order.orderBy?.name}</td>
                                    <td className={`${border1} pl-2`}>{order._id}</td>
                                    {/* <td className={`${border1} pl-2`}>{order.paymentType}</td>
                                    <td className={`${border1} pl-2 text-center`}>{renderIsPaid(order.isPaid)}</td> */}
                                    <td className={`${border1} pl-2 text-center`}>
                                        {format(new Date(order.createdAt), 'HH:mm dd-MM-yyyy')}
                                    </td>
                                    <td className={`${border1} pl-2`}>{order.status}</td>
                                    <td className={`${border1} pl-2 flex items-center justify-center h-full`}><span className="text-btn text-lg font-semibold">{order.totalPrice}</span> <BsCurrencyDollar/></td>
                                    <td className={`${border1} p-2`}>
                                        <Link className="flex items-center  gap-2 bg-slate-300 p-1 rounded-lg hover:bg-lime-700 hover:text-white" href={`/dashboard/order/${order._id}`}><MdOutlineBorderColor/>Detail</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
     );
}
 
export default OrderPage;