'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { login } from "../api/route";

const Login = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleBackHome = () => {
        router.push('/');
    }

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const data = await login(username, password, dispatch);
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
                title: "Signed in successfully"
              });
            checkRole(data);
        } catch (error) {
            console.error('Login error:', error.response.data.error);
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
                icon: "error",
                title: `${error.response.data.error}`
              });
        }
    }
    
    const checkRole = (role) => {
        if(role === 'customer'){
            router.push('/');
        }else if(role === 'admin'){
            router.push('/dashboard');
        }else{
            router.push('/staff');
        }
    }

    return(
        <div className="flex bg-gradient-to-r from-login-left to-login-right items-center justify-center h-screen bg-slate-100">
            <div className="bg-white flex h-3/4 w-4/5 shadow-login rounded-[25px]">
                <div className="bg-white h-full w-1/2 rounded-l-pd flex flex-col gap-y-5 rounded-l-[25px]">
                    <div className="text-signup-left text-2xl p-4 h-1/5 font-bold cursor-pointer" onClick={handleBackHome}>FAST FOOD</div>
                    <div className=" h-4/5 flex flex-col items-center gap-2">
                        <div className="text-signup-left text-4xl font-bold">Sign in  Account</div>
                        <div className="border-2 w-20 border-signup-left"></div>
                        <form onSubmit={handleLogin} className="my-5 flex flex-col items-center gap-4">
                            <label className="flex items-center gap-2 w-72 p-3 bg-slate-100">
                                <AiOutlineMail className="w-1/12"/>
                                <input 
                                    type="text" 
                                    placeholder="Username" 
                                    className="w-full bg-slate-100 outline-none"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </label>
                            <label className="flex items-center gap-2 w-72 p-3 bg-slate-100">
                                <AiOutlineLock className="w-1/12"/>
                                <input 
                                    type="password" 
                                    placeholder="Password" 
                                    className="w-full bg-slate-100 outline-none"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </label>
                            <div className="flex w-72 items-center justify-between">
                                <label className="flex items-center gap-1"><input type="checkbox" />Remember Me</label>
                                <Link href={'/auth/forgotPassword'} className="hover:text-signup-left">Forgot Password</Link>
                            </div>
                            <button type="submit" className="bg-signup-left text-white w-36 rounded-full my-3 p-3">
                                Sign In
                            </button>
                        </form>
                        
                    </div>
                </div>
                <div className="flex flex-col h-full w-1/2 items-center justify-center gap-y-5 bg-gradient-to-r from-[#fc6076] to-[#ff9a44] rounded-bl-full">
                    <div className="text-4xl text-white font-bold">Hello, Friend!</div>
                    <div className="border-2 w-20 border-white"></div>
                    <div className="text-white">Fill up personal information and start journey with us</div>
                    <Link href={'/auth/signup'} className="text-white border-2 w-36 rounded-full my-3 p-3 flex items-center justify-center hover:bg-white hover:text-signup-left">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login;
