'use client'
import { useState } from "react";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from "react-redux";
import { FaSearch, FaUserAlt, FaShoppingCart, FaFacebookSquare, FaTiktok  } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import Tippy from '@tippyjs/react/headless';

import Popper from "./Popper";

const Header = () => { 
    // const user = useSelector(state => state.auth.user);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();
    
    const handleSubmitSearch = (e) => {
        e.preventDefault();
        router.push(`/search?keyword=${searchText}`);
    }

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
                                placeholder="Search for products..." 
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
                <div className='w-3/12 flex items-center gap-5 pl-10 '>
                    <div className="w-1/2 p-4 text-center">
                        <Link href={'/cart'} className="flex items-center justify-center gap-2 hover:text-[#ffc139] duration-300 font-semibold">
                            <FaShoppingCart /> Cart
                        </Link>
                    </div>
                    {user && Object.keys(user).length !== 0 ? (
                        <Link href={'/information'} className="flex items-center gap-2 cursor-pointer text-[#ff9b49] duration-300 font-semibold">
                            <FaUser />
                            {user.name}
                        </Link>
                    ) : (
                        <div className="w-1/2 p-4">
                            <Link href={'/auth'} className="flex items-center justify-center gap-2 hover:text-[#ffc139] duration-300 font-semibold">
                                <FaUserAlt />
                                Login
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <div className=" w-full h-1/2 ">
                <div className="flex items-center w-full h-full">
                    <div className=" w-4/6 ">
                        <ul className="flex gap-4 justify-end">
                            <li className="p-2 hover:text-[#ffc139] font-semibold"><Link href={'/'}>HOME</Link></li>
                            <li className="p-2 hover:text-[#ffc139] font-semibold"><Link href={'/about'}>ABOUT</Link></li>
                            <li className="p-2 hover:text-[#ffc139] font-semibold"><Link href={'/food'}>FOOD</Link></li>
                            <li className="p-2 hover:text-[#ffc139] font-semibold"><Link href={'/delivery'}>DELIVERY</Link></li>
                            <li className="p-2 hover:text-[#ffc139] font-semibold"><Link href={'/contact'}>CONTACT</Link></li>
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
