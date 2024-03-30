'use client'
import Link from "next/link";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";

import { getAllAddressUser, removeAddress } from "@/app/api/route";
import { useEffect, useState } from "react";


const Address = () => {
    // const user = useSelector(state => state.auth.user);
    // const accessToken = useSelector(state => state.auth.accessToken);
    const userString = sessionStorage.getItem('user');
    const user = JSON.parse(userString)
    const accessToken = sessionStorage.getItem('accessToken');
    const [address, setAddress] = useState([]);
    
    // console.log(user);
    const fetchAllAddressForUser = async() => {
        try {
            const data = await getAllAddressUser(accessToken);
            setAddress(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAllAddressForUser();
    }, []);

    console.log(user);
    const handleRemoveAddress = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await removeAddress(id, accessToken);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your address has been deleted.",
                        icon: "success"
                    });
                    window.location.reload();
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
        <div className="flex flex-col gap-5 px-5 w-full h-full">
            <Link href={'/information/address/newAddress'} className="bg-[#ff9b49] text-white px-2 py-1.5 rounded-3xl w-1/6 font-semibold text-center">New Address</Link>
            {address && address.length > 0 ? (
                <table className="table-auto border-4 w-full h-1/2">
                    <thead className="border-2 bg-slate-200 text-xl font-semibold text-center">
                        <tr className="w-full">
                            <td className="border-2">Street</td>
                            <td className="border-2 text-center">City</td>
                            <td className="border-2 text-center">Province</td>
                            <td className="border-2"></td>
                        </tr>
                    </thead>
                    <tbody>
                        {address.map(add => (
                            <tr className="w-full" key={add._id}>
                                <td className="border-2 ">{add.street}</td>
                                <td className="border-2 text-center">{add.city}</td>
                                <td className="border-2 text-center">{add.province}</td>
                                <td className="border-2">
                                    <div className="flex items-center justify-center p-2 gap-2 w-full">
                                        <Link href={`/information/address/editAddress/${add._id}`} className="py-1 bg-[#ff9b49] rounded-full text-white flex items-center gap-2 w-1/2 justify-center">
                                            <FaRegEdit />   
                                            Edit
                                        </Link>
                                        <div onClick={() => handleRemoveAddress(add._id)} className="py-1 bg-[#ff9b49] rounded-full text-white flex items-center gap-2 w-1/2 justify-center cursor-pointer">
                                            <FaRegTrashAlt />
                                            Remove
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No Address...</div>
            )}
        </div>
    );
}
 
export default Address;