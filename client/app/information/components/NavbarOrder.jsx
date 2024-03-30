'use client'
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import Link from "next/link";

const NavbarAddress = () => {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const inactiveLink = 'flex items-center justify-center w-full px-4  cursor-pointer h-12 text-center text-lg font-bold hover:bg-slate-100'
    const active = inactiveLink + ' bg-gradient-to-r from-signup-left to-signup-right text-white';
    
    const hanleBack = async() => {
        router.push('/information');
    }
    const a = 5;
    const test = () => {
        router.push(`/information/order/orderPending?a=${a}`);
    }

    return ( 
        <div>
            <div className="border-2">
                <div className="w-full text-sm font-medium text-gray-900 bg-white  rounded-xl">
                    <Link
                        href={"/information/order"}
                        className={pathname === '/information/order' ? active : inactiveLink}
                    >
                       All Order
                    </Link>
                    <div onClick={test}
                        href={"/information/order/orderPending"}
                        className={pathname.includes('/information/order/orderPending') ? active : inactiveLink}
                    >
                       Order Pending
                    </div>
                    <Link
                        href={"/information/order/orderProcessing"}
                        className={pathname.includes('/information/order/orderProcessing') ? active : inactiveLink}
                    >
                        Order Processing
                    </Link>
                    <Link
                        href={"/information/order/orderDelivered"}
                        className={pathname.includes('/information/order/orderDelivered') ? active : inactiveLink}
                    >
                        Order Delivered
                    </Link>
                    <Link
                        href={"/information/order/orderCancel"}
                        className={pathname.includes('/information/order/orderCancel') ? active : inactiveLink}
                    >
                        Order Cancel
                    </Link>
                    <button onClick={hanleBack} className={inactiveLink}>
                        Back
                    </button>
                </div>
            </div>
        </div>
     );
}
 
export default NavbarAddress;