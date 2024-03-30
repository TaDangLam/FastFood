'use client'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from "react";

import { getDetailAddress, updateAddr } from '@/app/api/route';
import { useDispatch, useSelector } from 'react-redux';

const editAddress = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { id } = useParams();
    const userString = sessionStorage.getItem('user');
    const user = JSON.parse(userString)
    const accessToken = sessionStorage.getItem('accessToken');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');


    const getDetailAddr = async() => {
        try {
            const data = await getDetailAddress(id, accessToken);
            setStreet(data.street);
            setCity(data.city);
            setProvince(data.province);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDetailAddr();
    }, [])

    const handleAupdateAddress = async(e) => {
        e.preventDefault();
        try {
            const data = { street, city, province };
            await updateAddr(data, id, accessToken);
            router.push('/information/address');
        } catch (error) {
            console.log(error)
        }
    }

    return ( 
        <div className="flex flex-col gap-5 px-2 w-full h-full">
            <div className=" w-full h-1/6 px-3 text-xl font-semibold">EDIT Address</div>
            <div className=" py-2 w-full h-5/6">
                <form onSubmit={handleAupdateAddress}>
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Street
                        </label>
                        <input
                        className={`appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 bg-gray-300`}
                        id="grid-password"
                        type="text"
                        placeholder="Please Enter Street"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        />

                    </div>

                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            City
                        </label>
                        <input
                        className={`appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 bg-gray-300`}
                        id="grid-password"
                        type="text"
                        placeholder="Please Enter City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        />

                    </div>

                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Province
                        </label>
                        <input
                        className={`appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 bg-gray-300`}
                        id="grid-password"
                        type="text"
                        placeholder="Please Enter Province"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        />

                    </div>
                    <button type="submit" className="bg-gradient-to-r from-signup-left to-signup-right hover:shadow-xl text-white font-bold py-2 px-4 mx-3 w-36 rounded mt-2">
                        Update
                    </button>
                </form>
            </div>
        </div>
     );
}
 
export default editAddress;