'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useState } from "react";

import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { FaRegUser, FaRegAddressCard } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { login, register } from "@/app/api/route";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [fullName, setFullName] = useState('')
    const dispatch = useDispatch();
    const router = useRouter();

    const handleBackHome = () => {
        router.push('/');
    }

    const handleRegister = async(e) => {
        e.preventDefault();
        try{
            const newUser = { username, password, repeatPassword, email, phone, fullName }; 
            await register(newUser);
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
                
              });
              Toast.fire({
                icon: "success",
                title: "Signup is successfully"
              });
            router.push('/auth');
        }catch(error){
            Swal.fire({
                icon: 'error',
                text: `${error.response.data.error}`,
            });
        }
    }

    return(
        <div className="flex bg-gradient-to-r from-login-left to-login-right items-center justify-center h-screen">
            <div className="flex h-5/6 w-4/5 shadow-signup rounded-pd bg-white">
                <div className="flex flex-col items-center justify-center gap-y-5 bg-gradient-to-r from-[#fc6076] to-[#ff9a44] h-full w-2/5 rounded-br-full">
                    <div className="text-4xl text-white font-bold">Hello, Friend!</div>
                    <div className="border-2 w-20 border-white"></div>
                    <div className="text-white">Fill up personal information</div>
                    <Link href={'/auth'} className="text-white border-2 w-36 rounded-full my-3 p-3 flex items-center justify-center hover:bg-white hover:text-signup-left">
                        Sign In
                    </Link>
                </div>
                <div className="h-full w-3/5 rounded-r-pd flex flex-col gap-2">
                    <div className="text-signup-left text-2xl px-4 py-3 h-1/6 font-bold cursor-pointer w-full" onClick={handleBackHome}>FAST FOOD</div>
                    <div className=" h-5/6 w-full flex flex-col items-center ">
                        <div className="text-signup-left text-4xl font-bold h-1/6">Sign up Account</div>
                        <form onSubmit={handleRegister} className="my-5 flex flex-col items-center gap-4 w-full h-5/6">
                            <div className="flex flex-col gap-2 w-full px-3 h-5/6 ">
                                    <div className="flex items-center gap-2  p-3 bg-slate-100 w-full">
                                        <FaRegAddressCard  className="w-1/12"/>
                                        <input 
                                        type="text" 
                                        placeholder="Full Name" 
                                        className="w-11/12 bg-slate-100 outline-none"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex items-center gap-2  p-3 bg-slate-100 w-full">
                                        <FaRegUser className="w-1/12"/>
                                        <input 
                                        type="text" 
                                        placeholder="User Name" 
                                        className="w-11/12 bg-slate-100 outline-none"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex items-center gap-2  p-3 bg-slate-100 w-full">
                                        <AiOutlineMail className="w-1/12"/>
                                        <input 
                                        type="text" 
                                        placeholder="Email" 
                                        className="w-11/12 bg-slate-100 outline-none"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex items-center gap-2  p-3 bg-slate-100 w-full">
                                        <AiOutlineLock className="w-1/12"/>
                                        <input 
                                        type="password" 
                                        placeholder="Password" 
                                        className="w-11/12 bg-slate-100 outline-none"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex items-center gap-2  p-3 bg-slate-100 w-full">
                                        <AiOutlineLock className="w-1/12"/>
                                        <input 
                                        type="password" 
                                        placeholder="Repeat Password" 
                                        className="w-11/12 bg-slate-100 outline-none"
                                        value={repeatPassword}
                                        onChange={(e) => setRepeatPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex items-center gap-2  p-3 bg-slate-100 w-full">
                                        <FiPhoneCall className="w-1/12"/>
                                        <input 
                                        type="text" 
                                        placeholder="Phone" 
                                        className="w-11/12 bg-slate-100 outline-none"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                            </div>
                            
                            <button type="submit" className="bg-signup-left text-white w-36 rounded-full my-3 p-3 ">
                                Sign up
                            </button>
                        </form>
                        
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Signup;
