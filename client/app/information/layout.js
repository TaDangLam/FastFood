'use client'
import { usePathname } from "next/navigation";

import HeaderInfo from "./components/HeaderInfo";
import NavbarInfo from "./components/NavbarInfo";
import NavbarOrderDetail from './components/NavbarOrderDetail'
import NavbarAddress from "./components/NavbarAddress";
import NavbarOrder from './components/NavbarOrder'
import NavbarStaff from "./components/NavbarStaff";

const InformationLayout = ({ children }) => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const pathname = usePathname();
    const isAuthOrDashboardPage = pathname.startsWith('/information/order/orderdetail');
    const isOrderStatus = pathname.startsWith('/information/order');
    const isAddressPage = pathname.startsWith('/information/address/newAddress');
    const isEditAddressPage = pathname.startsWith('/information/address/editAddress');
    const showHeaderAndFooter = !isAuthOrDashboardPage && !isAddressPage && !isEditAddressPage && !isOrderStatus;
    const isStaffOnOrderDetailPage = user && user.role === 'staff' && isAuthOrDashboardPage;

    return ( 
        <div className="margin-component mt-[31px] flex flex-col gap-5 py-5">
            <div className="">
                {user && user.role !== 'staff' && <HeaderInfo />}
            </div>
            <div className="flex w-full gap-5">
                <div className="w-3/12 relative">
                   {isStaffOnOrderDetailPage ? (
                        <NavbarOrderDetail />
                    ) : user && user.role === 'staff' ? (
                        <div className="sticky top-10 duration-200"><NavbarStaff /></div>
                    ) : showHeaderAndFooter ? (
                        <NavbarInfo />
                    ) : isOrderStatus ? (
                        <div className="sticky top-10 duration-200"><NavbarOrder /></div>
                    ) : (
                        <NavbarAddress />
                    )}
                </div>
                <div className='w-9/12 rounded-xl border-2 px-2 py-5'>{children}</div>
            </div>
        </div>
    );
}
 
export default InformationLayout;