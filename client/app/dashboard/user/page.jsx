"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

import { getAllUser } from "@/app/api/route";
import { deleteUser } from "@/app/api/route";

const User = () => {
  const [userData, setUserData] = useState([]);
  const accessToken = sessionStorage.getItem('accessToken');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const border1 = "border border-slate-400";
  const border2 = border1 + " font-semibold text-xl";

  const getAllUserForAdmin = async(accessToken) => {
    try {
      const data = await getAllUser(accessToken);
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(userData)
  
    useEffect(() => {
      getAllUserForAdmin(accessToken);
  }, [accessToken])

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
          <div className="text-[#4b6cb7] text-3xl font-bold w-full h-1/6">
            User
          </div>
          <table
            className={`table-auto border-collapse ${border1} w-full h-5/6 `}
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
                    className={`${border1} pl-2 text-center p-2 flex justify-center`}
                  >
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
