'use client'
import Swal from "sweetalert2";
import { format } from 'date-fns';
import { useEffect, useState } from "react";
import Link from "next/link";
import { BsCurrencyDollar } from "react-icons/bs";
import { MdOutlineBorderColor } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";

// import Spinner1 from "@/components/spinner1";
import { deleteOrder, getAllOrderAdmin, getAllOrderCancleAdmin, getAllOrderDeliveredAdmin, getAllOrderPendingAdmin, getAllOrderProcessingAdmin, searchOrder } from "@/app/api/route";
import { IoTrashBinOutline } from "react-icons/io5";

const OrderPage = () => {
    const router = useRouter();
    const status = useSearchParams().get('status');
    const accessToken = sessionStorage.getItem('accessToken');
    const [searchText, setSearchText] = useState('');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const border1 = 'border border-slate-400';
    const border2 = border1 + ' font-semibold text-xl';

    // const getAllOrder = async() => {
    //     try {
    //         const data = await getAllOrderAdmin(accessToken);
    //         setOrders(data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

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

    const handleSubmitSearch = async(e) => {
        e.preventDefault();
        try {
            const newSearch = await searchOrder(searchText, accessToken);
            setOrders(newSearch);
        } catch (error) {
            console.log(error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Please Search Another Order",
                showConfirmButton: false,
                timer: 1500
              });
        }
    }

    const handleRemoveOrder = (id, accessToken) => {
        Swal.fire({
            title: "Are you sure delete this order?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteOrder(id, accessToken);
                    Swal.fire({
                        title: "Deleted!",
                        text: "This order has been deleted",
                        icon: "success"
                    });
                    window.location.reload();
                } catch (error) {
                    console.log(error)
                    Swal.fire({
                        title: "Error!",
                        text: `Delete is Failed`,
                        icon: "error"
                    });
                }
            }
        });
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

    const handleClickStatusOrder = (status) => {
        router.push(`/dashboard/order?status=${status}`)
    }

    return (
        <div className="flex flex-col">
            {loading ? (
                <div className="text-center py-40"><Spinner1 /></div>
            ) : (
                <div className="flex flex-col gap-2.5 w-full h-full">
                    <div className="text-[#4b6cb7] text-3xl font-bold w-2/12 h-1/6 border-b-4 border-[#4b6cb7]">Order</div>
                    <div className="text-[#4b6cb7] font-bold w-full h-1/6 flex gap-2">
                        <div className="flex items-center gap-2 w-1/2">
                            <div onClick={() => handleClickStatusOrder('Delivered')} className="w-1/4 p-2 text-md text-center rounded-xl text-white bg-[#4b6cb7] hover:opacity-80 cursor-pointer duration-300">Delivered</div>
                            <div onClick={() => handleClickStatusOrder('Processing')} className="w-1/4 p-2 text-md text-center rounded-xl text-white bg-[#4b6cb7] hover:opacity-80 cursor-pointer duration-300">Processing</div>
                            <div onClick={() => handleClickStatusOrder('Pending')} className="w-1/4 p-2 text-md text-center rounded-xl text-white bg-[#4b6cb7] hover:opacity-80 cursor-pointer duration-300">Pending</div>
                            <div onClick={() => handleClickStatusOrder('Cancel')} className="w-1/4 p-2 text-md text-center rounded-xl text-white bg-[#4b6cb7] hover:opacity-80 cursor-pointer duration-300">Cancel</div>
                        </div>
                        <div className="flex items-center justify-center w-1/2">
                            <form
                                onSubmit={handleSubmitSearch}
                                className="flex w-7/12 h-full border-2 rounded-lg"
                            >
                                <input
                                    type="text"
                                    value={searchText}
                                    onChange={e => setSearchText(e.target.value)}
                                    placeholder="Search for order (By ID)" 
                                    className="appearance-none block w-full h-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                />
                                <button
                                    type="submit"
                                    className="bg-white text-black rounded-r-xl h-full p-4 flex items-center justify-center border-l-2 w-3/12"
                                >
                                    <FaSearch />
                                </button>
                            </form>
                        </div>
                    </div>
                    {orders && orders.length > 0 ? (
                        <table className={`table-auto border-collapse ${border1} w-full h-4/6 mt-5`}>
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
                                            {order.status === 'Cancel' ? (
                                                <div className="flex items-center gap-2">
                                                    <Link className="flex items-center justify-center  gap-2 bg-slate-300 p-1 rounded-lg hover:bg-lime-700 hover:text-white w-1/2 h-full duration-300" href={`/dashboard/order/${order._id}`}><MdOutlineBorderColor/>Detail</Link>
                                                    <div onClick={() => handleRemoveOrder(order._id, accessToken)} className="flex items-center justify-center  gap-2 bg-slate-300 p-1 rounded-lg hover:bg-red-700 hover:text-white w-1/2 h-full cursor-pointer duration-200">
                                                        <IoTrashBinOutline />
                                                        Delete
                                                    </div> 
                                                </div>
                                            ) : (
                                                <div className="">
                                                    <Link className="flex items-center justify-center  gap-2 bg-slate-300 p-1 rounded-lg hover:bg-lime-700 hover:text-white h-full" href={`/dashboard/order/${order._id}`}><MdOutlineBorderColor/>Detail</Link>
                                                </div> 
                                            )}
                                            
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="w-full flex items-center justify-center">
                            <img src="/noOrder.png" alt="images" className="w-1/2"/>
                        </div>
                    )}
                </div>
            )}
        </div>
     );
}
 
export default OrderPage;