"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";
import { TbUserUp, TbUserDown } from "react-icons/tb";

import { deleteUser, getAllCustomer, getAllStaff, updateRoleUser } from "@/app/api/route";

const User = () => {
  const user = useSearchParams().get('user');
  const [userData, setUserData] = useState([]);
  const accessToken = sessionStorage.getItem('accessToken');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const border1 = "border border-slate-400";
  const border2 = border1 + " font-semibold text-xl";

  const getAllCustomerForAdmin = async(accessToken) => {
    try {
      const data = await getAllCustomer(accessToken);
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  }

  const getAllStaffForAdmin = async(accessToken) => {
    try {
      const data = await getAllStaff(accessToken);
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  }

  const changePath = async(params) => {
    await router.push(`/dashboard/user?user=${params}`);
  }


  useEffect(() => {
      switch (user) {
        case 'Customer':
            getAllCustomerForAdmin(accessToken);
          break;
        default:
            getAllStaffForAdmin(accessToken);
          break;
      }
  }, [accessToken, user])

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then(async (result) => {
      if (result.isConfirmed) {
          try {
              await deleteUser(id, accessToken);
              Swal.fire({
                  title: "Deleted!",
                  text: "This User has been deleted.",
                  icon: "success"
              });
          } catch (error) {
              console.log(error)
              Swal.fire({
                  title: "Error!",
                  text: `${error.response.data}`,
                  icon: "error"
              });
          }
      }
    });
  }

  const handlePermission = (userId, accessToken) => {
    Swal.fire({
      title: "Are you up permission user to staff?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(userId)
        console.log(accessToken)
          try {
              await updateRoleUser(userId, accessToken);
              Swal.fire({
                  title: "Updated!",
                  text: "This User has been up to staff.",
                  icon: "success"
              });
              router.push('/dashboard/user?user=Staff')
          } catch (error) {
              console.log(error)
              Swal.fire({
                  title: "Error!",
                  text: `${error}`,
                  icon: "error"
              });
          }
      }
    });
  }

  const handleDownPermission = (userId, accessToken) => {
    Swal.fire({
      title: "Are you eviction permission this staff?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(userId)
        console.log(accessToken)
          try {
              await updateRoleUser(userId, accessToken);
              Swal.fire({
                  title: "Eviction!",
                  text: "This Staff has been eviction permisstion.",
                  icon: "success"
              });
              router.push('/dashboard/user?user=Customer')
          } catch (error) {
              console.log(error)
              Swal.fire({
                  title: "Error!",
                  text: `${error}`,
                  icon: "error"
              });
          }
      }
    });
  }

  return (
    <div className="">
      {loading ? (
        <div className="text-center p-40">
          Loading.........
        </div>
      ) : (
        <div className="flex flex-col gap-5 w-full h-full px-1.5">
          {user && user === 'Customer' ? (
            <div className="text-[#4b6cb7] text-3xl font-bold w-full h-1/6">
              Customer
            </div>
          ) : (
            <div className="text-[#4b6cb7] text-3xl font-bold w-full h-1/6">
              Staff
            </div>
          )}
          <div className="flex gap-5 w-full h-1/6">
            <div onClick={() => changePath('Customer')} className="h-full bg-[#4b6cb7] text-white p-2 rounded-xl w-1/12 text-center cursor-pointer duration-500 hover:opacity-85">Customers</div>
            <div onClick={() => changePath('Staff')} className="h-full bg-[#4b6cb7] text-white p-2 rounded-xl w-1/12 text-center cursor-pointer duration-500 hover:opacity-85">Staff</div>
          </div>
          <table
            className={`table-auto border-collapse ${border1} w-full h-4/6 `}
          >
            <thead>
              <tr className="bg-[#4b6cb7] text-white text-center">
                <td className={border2}>Index</td>
                <td className={border2}>Name</td>
                <td className={border2}>ID</td>
                <td className={border2}>User Name</td>
                <td className={border2}>Phone</td>
                <td className={border2}>Email</td>
                <td className={border2}></td>
              </tr>
            </thead>
            <tbody>
              {userData.map((data, index) => (
                <tr key={data._id}>
                  <td className={`${border1} pl-2 text-center`}>{index + 1}</td>
                  <td className={`${border1} pl-2`}>{data.fullName}</td>
                  <td className={`${border1} pl-2`}>{data._id}</td>
                  <td className={`${border1} pl-2 text-center`}>{data.name}</td>
                  <td className={`${border1} pl-2 text-center`}>{data.phone}</td>
                  <td className={`${border1} pl-2 `}>
                    {data.email}
                  </td>
                  <td
                    className={`${border1} pl-2 text-center p-2 flex gap-3 justify-center`}
                  >
                    {user && user === 'Customer' ? (
                      <div className="flex gap-2">
                          <div
                            onClick={() => handlePermission(data._id, accessToken)}
                            className="flex items-center bg-lime-600 p-1 gap-1 rounded-lg text-white hover:bg-green-700 cursor-pointer"
                            >
                            <TbUserUp className="text-lg"/>
                            Permission
                          </div>
                          <div
                            onClick={() => handleDeleteUser(data._id)}
                            className="flex bg-slate-400 p-1 gap-1 rounded-lg text-white hover:bg-red-800 cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                            Delete
                          </div>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                          <div
                            onClick={() => handleDownPermission(data._id, accessToken)}
                            className="flex items-center bg-red-900 p-1 gap-1 rounded-lg text-white hover:bg-red-700 cursor-pointer duration-200"
                            >
                                <TbUserDown className="text-lg"/>
                                Eviction
                          </div>
                          <div
                            onClick={() => handleDeleteUser(data._id)}
                            className="flex bg-slate-400 p-1 gap-1 rounded-lg text-white hover:bg-red-800 cursor-pointer duration-200"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                            Delete
                          </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default User;
