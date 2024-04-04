'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation'

import { logout } from "@/app/api/route";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation'

const NavbarStaff = () => {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const inactiveLink = 'flex items-center w-full px-4  cursor-pointer h-12 text-center text-lg font-bold hover:bg-slate-100'
    const active = inactiveLink + ' bg-gradient-to-r from-signup-left to-signup-right text-white';
    
    const handleLogout = () => {
        logout(dispatch);
        router.push('/')
    }
    
    return ( 
        <div>
            <div className="border-2 ">
                <div className="w-full text-sm font-medium text-gray-900 bg-white  rounded-xl">
                    <Link
                        href={"/information/staff/managerStatusProduct"}
                        className={pathname.includes('/information/staff/managerStatusProduct') ? active : inactiveLink}
                    >
                        Product Status Management
                    </Link>
                    <Link
                        href={"/information/staff/managerOrder?status=Pending"}
                        className={pathname === '/information/staff/managerOrder' ? active : inactiveLink}
                    >
                        Order Management
                    </Link>
                    <Link
                        href={"/information/staff/notification"}
                        className={pathname === '/information/staff/notification' ? active : inactiveLink}
                    >
                        Notification
                    </Link>
                    <button onClick={handleLogout} className={inactiveLink}>
                        Log out
                    </button>
                </div>
            </div>
        </div>
     );
}
 
export default NavbarStaff;