'use client'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { updateUser } from "../api/route";

const Information = () => {
    // const user = useSelector(state => state.auth.user);
    // const accessToken = useSelector(state => state.auth.accessToken);
    const userString = sessionStorage.getItem('user');
    const user = JSON.parse(userString)
    const accessToken = sessionStorage.getItem('accessToken');
    const dispatch = useDispatch();
    const [email, setEmail] = useState(user?.email);
    const [fullName, setFullName] = useState(user?.fullName);
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [phone, setPhone] = useState(user?.phone);
    
    
    // useEffect(() => {
    //   if (fullName !== user?.fullName || email !== user?.email || phone !== user?.phone) {
    //     const updatedUser = { ...user, fullName, email, phone };
    //     sessionStorage.setItem('user', JSON.stringify(updatedUser));
    //   }
    // }, [fullName, email, phone, user]);

    const UpdateInfo = async(e) => {
      e.preventDefault();
        try {
            const userID = user._id;
            const newUser = { email, password, repeatPassword, phone, accessToken, userID, fullName };
            await updateUser(newUser, dispatch);
            const updatedUser = { ...user, email, fullName, phone };
            sessionStorage.setItem('user', JSON.stringify(updatedUser));
            const Toast = Swal.mixin({
              toast: true,
              position: "center",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "success",
              title: "Update is Successfully"
            });
        } catch (error) {
          console.error('Login error:', error);
          const Toast = Swal.mixin({
            toast: true,
            position: "center",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "error",
            title: "Update is Failed!!"
          });
        }
    }
    // console.table(user)
    return (
        <div className="">
          <div className="flex h-full gap-5">
            <div className=" w-full h-full ">
              <form onSubmit={UpdateInfo} className="w-full p-5">
                
              <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Name
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="email"
                      type="text"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder=""
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Email
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="email"
                      type="text"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder=""
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Phone
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="phone"
                      type="text"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder=""
                    />
                  </div>
                </div>

                <div className={`flex flex-wrap -mx-3 mb-6 py-3 rounded-md text-gray-500`}>
                  <div className="w-full px-3 mb-6">
                    <h2 className="text-xl w-full mb-6 uppercase font-bold">
                      Change password
                    </h2>
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Password
                    </label>
                    <input
                      className={`appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 bg-gray-300`}
                      id="grid-password"
                      type="password"
                      placeholder="******************"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className="text-gray-600 text-xs italic">
                      Keep blank if you don't want to change
                    </p>
                  </div>

                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Repeat Password
                    </label>
                    <input
                      className={`appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 bg-gray-300`}
                      id="grid-password"
                      type="password"
                      placeholder="******************"
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                    <label className="inline-flex items-center mt-3">
                      
                      
                    </label>
                  </div>
                </div>

                <button type="submit" className="bg-gradient-to-r from-signup-left to-signup-right hover:shadow-xl text-white font-bold py-2 px-4 mx-3 w-36 rounded">
                  Confirm
                </button>
              </form>
            </div>
          </div>
        </div>
      );
}
 
export default Information;