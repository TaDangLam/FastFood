'use client'
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useState } from 'react';

const NavbarOrder = () => {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('All');
    const inactiveLink = 'flex items-center  w-full px-4  cursor-pointer h-12 text-center text-lg font-bold hover:bg-slate-100'
    const active = inactiveLink + ' bg-gradient-to-r from-signup-left to-signup-right text-white';
    
    const hanleBack = async() => {
        router.push('/information');
    }

    const handlePath = (path) => {
        setActiveTab(path)
        router.push(`/information/order?path=${path}`);
    }

    return ( 
        <div>
            <div className="border-2">
                <div className="w-full text-sm font-medium text-gray-900 bg-white  rounded-xl">
                    <div onClick={() => handlePath('All')}
                        href={"/information/order"}
                        className={activeTab === 'All' ? active : inactiveLink}
                    >
                       All
                    </div>
                    <div onClick={() => handlePath('Pending')}
                        href={"/information/order"}
                        className={activeTab === 'Pending' ? active : inactiveLink}
                    >
                       Pending
                    </div>
                    <div onClick={() => handlePath('Processing')}
                        href={"/information/order"}
                        className={activeTab === 'Processing' ? active : inactiveLink}
                    >
                        Processing
                    </div>
                    <div onClick={() => handlePath('Delivered')}
                        href={"/information/order"}
                        className={activeTab === 'Delivered' ? active : inactiveLink}
                    >
                        Delivered
                    </div>
                    <div onClick={() => handlePath('Cancel')}
                        href={"/information/order"}
                        className={activeTab === 'Cancel' ? active : inactiveLink}
                    >
                        Cancel
                    </div>
                    <button onClick={hanleBack} className={inactiveLink}>
                        Back
                    </button>
                </div>
            </div>
        </div>
     );
}
 
export default NavbarOrder;