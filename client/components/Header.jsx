'use client'
import { useEffect, useState } from "react";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch } from "react-redux";
import { FaSearch, FaUserAlt, FaShoppingCart, FaFacebookSquare, FaTiktok, FaUser  } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { IoIosLogOut, IoIosNotifications } from "react-icons/io";
import { io } from 'socket.io-client';
import Tippy from '@tippyjs/react/headless';
import { MdOutlineAccountCircle } from "react-icons/md";
import { CiGift } from "react-icons/ci";
import { FaRegAddressBook, FaAngleDown } from "react-icons/fa6";
import { GrUserManager } from "react-icons/gr";

import Popper from "./Popper";
import { logout } from "@/app/api/route";
import DropdownHome from "./DropdownHome";

const Header = () => { 
    // const user = useSelector(state => state.auth.user);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [isHovered, setIsHovered] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [notification, setNotification] = useState(user?.notification);
    const [visibleNotifications, setVisibleNotifications] = useState([]);
    const dispatch = useDispatch();
    const router = useRouter();
    
    const handleSubmitSearch = (e) => {
        e.preventDefault();
        router.push(`/search?keyword=${searchText}`);
    }
    
    const handleLogout = async() => {
        await logout(dispatch);
        router.push('/auth')
    }

    // useEffect(() => {
    //     const socket = io(`${process.env.NEXT_PUBLIC_BACKEND}`);
    //     if (user && user.role === 'staff') {
    //         socket.on("newOrderNotification", (data) => {
    //             setNotification((prev) => [...prev, data.message]);
    //         }); 
    //     }
    //     return () => socket.disconnect();
    // }, []);

    // useEffect(() => {
    //     if (user) {
    //         const updatedUser = { ...user, notification: notification };
    //         sessionStorage.setItem('user', JSON.stringify(updatedUser));
    //     }
    // }, [notification]);
    useEffect(() => {
        const socket = io(`${process.env.NEXT_PUBLIC_BACKEND}`);
        if (user && user.role === 'staff') {
            socket.on("newOrderNotification", (data) => {
                const newNotification = { message: data.message, isSeen: false, isNew: true };
                setNotification((prev) => [newNotification, ...prev]);
                updateNotifications(newNotification);
            }); 
        }
        return () => socket.disconnect();
    }, []);

    const updateNotifications = (newNotification) => {
        const updatedNotifications = [newNotification, ...notification.filter((_, index) => index < 4)];
        // setNotification(updatedNotifications);
        setVisibleNotifications(updatedNotifications);
    };

    useEffect(() => {
    if (user) {
        const updatedUser = { ...user, notification: notification };
        sessionStorage.setItem('user', JSON.stringify(updatedUser));
    }
    }, [notification]);
    console.log('notification: ', notification);
    console.log('Visable: ', visibleNotifications);

    return(
        <div className='margin-component h-full'>
            <div className="flex w-full h-1/2 pt-2">
                <div className='w-3/12'>
                    <Link href={'/'}><img src="/logo3.png" alt="Logo" className='w-40 h-40 rounded'/></Link>
                </div>
                <div className='w-6/12  flex items-center'>
                    <div className="flex items-center w-full bg-white h-1/2">
                        <form 
                            onSubmit={handleSubmitSearch}
                            className="flex items-center w-full h-full"
                        >
                            <input 
                                type="text"
                                value={searchText}
                                onChange={e => setSearchText(e.target.value)}
                                placeholder="Search for products (By ID, Name, Status)" 
                                className="rounded-l-2xl p-5 h-1/2 w-11/12 bg-slate-100 focus:outline-none "
                            />
                            
                            <button 
                                type="submit"
                                className="bg-slate-100 text-black p-5 rounded-r-2xl h-1/2 w-1/12 flex items-center justify-center">
                                    <FaSearch />
                            </button>
                        </form>
                    </div>
                </div>
                {user && user.role === 'staff' ? (
                    <div className="w-3/12 flex items-center gap-5 px-5">
                        <Tippy
                            interactive
                            arrow
                            // visible
                            delay={200}
                            placement='bottom'
                            render={attrs => (
                                <div className="box" tabIndex="-1" {...attrs}>
                                    <Popper>
                                        <div className='bg-slate-100 w-80 h-full  border-2 rounded-lg flex flex-col gap-2.5'>
                                            <Link href={'/information/staff/managerStatusProduct'} className='flex items-center gap-2 py-1 pl-3 text-lg font-semibold hover:bg-gradient-to-r from-signup-left to-signup-right hover:text-white duration-100 hover:rounded-t-lg '><GrUserManager />Product Status Management </Link>
                                            <Link href={`/information/staff/managerOrder?status=Pending`} className='flex items-center gap-2 py-1 pl-3 text-lg font-semibold hover:bg-gradient-to-r from-signup-left to-signup-right hover:text-white duration-100 '><CiGift /> Order Management</Link>
                                            <div onClick={handleLogout} className='flex items-center gap-2 py-1 pl-3 text-lg font-semibold hover:bg-gradient-to-r from-signup-left to-signup-right hover:text-white duration-100 hover:rounded-b-lg cursor-pointer '><IoIosLogOut />Logout</div>
                                        </div>
                                    </Popper>
                                </div>
                            )}
                        >
                            <Link href={'/information/staff/managerStatusProduct'} className="flex items-center gap-2 cursor-pointer text-[#ff9b49] duration-300 font-semibold justify-center w-1/2">
                                    <FaUser />
                                    {user.name} (Staff)
                            </Link>
                        </Tippy> 
                        <Tippy
                            interactive
                            arrow
                            // visible
                            trigger="mouseenter focus"
                            delay={200}
                            placement='bottom'
                            render={attrs => (
                                <div className="box" tabIndex="-1" {...attrs}>
                                    <Popper>
                                        <div className="border-2 rounded-xl bg-slate-100">
                                            {visibleNotifications  && visibleNotifications.length > 0 ? (
                                                <div className="p-3">
                                                    {visibleNotifications.map(note => (
                                                        <div className='w-[500px] h-full p-6 border-b-2 hover:bg-slate-300 cursor-pointer'>
                                                            {note.message}
                                                        </div>
                                                    ))}
                                                    <Link href={'/information/staff/notification'} className="flex items-center justify-center p-6 text-[#4b6cb7] font-bold hover:bg-slate-300">
                                                        All Notification
                                                    </Link> 
                                                </div>
                                            ) : (
                                                <div className="p-3">
                                                    {notification.slice(0, 5).map(note => (
                                                        <div className='w-[500px] h-full p-6 border-b-2 hover:bg-slate-300 cursor-pointer '>
                                                            {note.message}
                                                        </div>
                                                    ))}
                                                    <Link href={'/information/staff/notification'} className="flex items-center justify-center p-6 text-[#4b6cb7] font-bold hover:bg-slate-300">
                                                        All Notification
                                                    </Link> 
                                                </div>
                                            )}
                                        </div>
                                    </Popper>
                                </div>
                            )}
                        >
                            <Link href={'/information'} className="flex items-center gap-2 cursor-pointer duration-300 font-semibold w-1/2 justify-center text-xl">
                                <IoIosNotifications  /> ({visibleNotifications?.length}) 
                            </Link>
                        </Tippy>    
                    </div>
                ) : (
                    <div className='w-3/12 flex items-center gap-5 pl-10 '>
                        <div className="w-1/2 p-4 text-center">
                            <Link href={'/cart'} className="flex items-center justify-center gap-2 hover:text-[#ffc139] duration-300 font-semibold">
                                <FaShoppingCart /> Cart
                            </Link>
                        </div>
                        {user && Object.keys(user).length !== 0 ? (
                            <Tippy
                                interactive
                                arrow
                                // visible
                                delay={200}
                                placement='bottom'
                                render={attrs => (
                                    <div className="box" tabIndex="-1" {...attrs}>
                                        <Popper>
                                            <div className='bg-slate-100 w-56 h-full  border-2 rounded-lg flex flex-col gap-2.5'>
                                                <Link href={'/information'} className='flex items-center gap-2 py-1 pl-3 text-lg font-semibold hover:bg-gradient-to-r from-signup-left to-signup-right hover:text-white duration-100 hover:rounded-t-lg '><MdOutlineAccountCircle/>Account </Link>
                                                <Link href={'/information/address'} className='flex items-center gap-2 py-1 pl-3 text-lg font-semibold hover:bg-gradient-to-r from-signup-left to-signup-right hover:text-white duration-100 '><FaRegAddressBook /> Address</Link>
                                                <Link href={`/information/order`} className='flex items-center gap-2 py-1 pl-3 text-lg font-semibold hover:bg-gradient-to-r from-signup-left to-signup-right hover:text-white duration-100 '><CiGift /> Order</Link>
                                                <div onClick={handleLogout} className='flex items-center gap-2 py-1 pl-3 text-lg font-semibold hover:bg-gradient-to-r from-signup-left to-signup-right hover:text-white duration-100 hover:rounded-b-lg cursor-pointer '><IoIosLogOut />Logout</div>
                                            </div>
                                        </Popper>
                                    </div>
                                )}
                            >
                                <Link href={'/information'} className="flex items-center gap-2 cursor-pointer text-[#ff9b49] duration-300 font-semibold">
                                    <FaUser />
                                    {user.name}
                                </Link>
                            </Tippy>  
                        ) : (
                            <div className="w-1/2 p-4">
                                <Link href={'/auth'} className="flex items-center justify-center gap-2 hover:text-[#ffc139] duration-300 font-semibold">
                                    <FaUserAlt />
                                    Login
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className=" w-full h-1/2 ">
                <div className="flex items-center w-full h-full">
                    <div className=" w-4/6 ">
                        <ul className="flex gap-4 justify-end">
                            <li className="p-2 font-semibold ">
                                <Tippy
                                    interactive
                                    arrow
                                    // visible
                                    delay={200}
                                    placement='bottom'
                                    onHide={() => setIsHovered(false)}
                                    render={attrs => (
                                        <div className="box" tabIndex="-1" {...attrs} 
                                            onMouseEnter={() => setIsHovered(true)}
                                            onMouseLeave={() => setIsHovered(false)}
                                        >   
                                           <DropdownHome />
                                        </div>
                                    )}
                                >
                                    <Link href={'/'} className={`flex items-center gap-2 duration-200 ${isHovered ? 'text-[#ffc139]' : 'hover:text-[#ffc139]'}`}>HOME <FaAngleDown/></Link>
                                </Tippy>  
                            </li>
                            <li className="p-2 hover:text-[#ffc139] font-semibold duration-200"><Link href={'/about'}>ABOUT</Link></li>
                            <li className="p-2 hover:text-[#ffc139] font-semibold duration-200"><Link href={'/food'}>FOOD</Link></li>
                            <li className="p-2 hover:text-[#ffc139] font-semibold duration-200"><Link href={'/delivery'}>DELIVERY</Link></li>
                            <li className="p-2 hover:text-[#ffc139] font-semibold duration-200"><Link href={'/contact'}>CONTACT</Link></li>
                        </ul>
                    </div>
                    <div className="flex gap-3 justify-center w-2/6">
                        <a href="/" className="hover:text-[#ffc139]"><FaFacebookSquare className="h-15" /></a>
                        <a href="/" className="hover:text-[#ffc139]"><IoLogoInstagram className="h-15" /></a>
                        <a href="/" className="hover:text-[#ffc139]"><FaTiktok className="h-15" /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;
