'use client'
import { useEffect, useState } from "react";
// import Spinner1 from "@/components/spinner1";
import Swal from "sweetalert2";

import { createCategory, deleteCategory, fetchAllCategory } from "@/app/api/route";
import { useDispatch, useSelector } from "react-redux";

const CategoryPage = () => {
    const category = useSelector(state => state.category.categories);
    const accessToken = sessionStorage.getItem('accessToken');
    const dispatch = useDispatch()
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const border1 = 'border border-slate-400';
    const border2 = border1 + ' font-semibold text-xl';

    useEffect(() => {
        fetchAllCategory(dispatch);
    }, []);

    const handleRemoveCategory = async(id) => {
        Swal.fire({
            title: "Are you sure delete this category?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4b6cb7",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteCategory(id, accessToken, dispatch);
                    Swal.fire({
                        title: "Deleted!",
                        text: "This category has been deleted",
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

    const newCategory = async() => {
        try {
            const data = { name }
            await createCategory(accessToken, data, dispatch);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Create Category is success",
                showConfirmButton: false,
                timer: 1500
            });
            setName('');
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                text: 'An error occurred while creating the category!',
            });
        }
    }

    return ( 
        <div className="flex flex-col p-2 ">
            {loading ? (
                <div className="text-center py-40">Loading....</div>
            ) : (
                <div>
                    <div className="flex flex-col gap-1p-2 w-full h-1/6">
                        <input 
                            type="text" 
                            placeholder="Please add new category" 
                            className="appearance-none block w-full h-1/2 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div className="bg-[#4b6cb7] text-white rounded-md py-1 px-2 w-2/12 h-1/2 text-center font-semibold cursor-pointer" onClick={newCategory}>Add Category</div>
                    </div>
                    <table
                        className={`table-auto border-collapse ${border1} w-full h-5/6 mt-5`}
                    >
                        <thead>
                            <tr className="bg-[#4b6cb7] text-white text-center">
                                <td className={border2}>Index</td>
                                <td className={border2}>Name</td>
                                <td className={border2}>ID</td>
                                <td className={border2}></td>
                            </tr>
                        </thead>
                        <tbody>
                        {category.map((cate, index) => {
                            return (
                            <tr key={cate._id}>
                                <td className={`${border1} w-28 h-full text-center`}>{index + 1}</td>
                                <td className={`${border1} pl-2 text-center`}>{cate.name}</td>
                                <td className={`${border1} pl-2 text-center`}>{cate._id}</td>
                                <td className={`${border1} flex items-center justify-center gap-2 h-full px-2 py-1.5`}>
                                    <div
                                        onClick={() => handleRemoveCategory(cate._id)}
                                        className="flex bg-slate-400 p-2 gap-1 rounded-lg text-white hover:bg-rose-700 w-1/2  items-center justify-center cursor-pointer duration-200"
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
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
 
export default CategoryPage;