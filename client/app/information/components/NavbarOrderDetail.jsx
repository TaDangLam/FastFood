'use client'
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import Link from "next/link";

const NavbarOrderDetail = () => {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const inactiveLink = 'flex items-center justify-center w-full px-4  cursor-pointer h-12 text-center text-lg font-bold hover:bg-slate-100'
    const active = inactiveLink + ' bg-gradient-to-r from-signup-left to-signup-right text-white';
    
    const hanleBack = async() => {
        router.back();
        // router.push('/information/order')
    }

    return ( 
        <div>
            <div className="border-2">
                <div className="w-full text-sm font-medium text-gray-900 bg-white  rounded-xl">
                    <Link
                        href={"/information/address"}
                        className={pathname.includes('/information/order/orderdetail') ? active : inactiveLink}
                    >
                        Order Detail
                    </Link>

                    <button onClick={hanleBack} className={inactiveLink}>
                        Back
                    </button>
                </div>
            </div>
        </div>
     );
}
 
export default NavbarOrderDetail;