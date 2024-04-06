"use client";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import { getAllProduct, searchProduct, updateToSoldoutProduct, updateToStockProduct } from "@/app/api/route";
import Pagination from "@/components/Pagination";

const ManagerStatusProduct = () => {
    const router = useRouter();
    const [dataProduct, setDataProduct] = useState([]);
    const accessToken = sessionStorage.getItem('accessToken');
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = dataProduct.slice(indexOfFirstProduct, indexOfLastProduct);
    
    const border1 = "border border-slate-400";
    const border2 = border1 + " font-semibold text-xl";

    useEffect(() => {
        getAllProductForAdmin();
    }, []);
    
    const getAllProductForAdmin = async() => {
        try {
            const data = await getAllProduct();
            setDataProduct(data);
        } catch (error) {
            console.log(error);
        }
    }
    
    const handleSubmitSearch = async(e) => {
        e.preventDefault();
        const newSearch = await searchProduct(searchText);
        console.log(newSearch);
        setDataProduct(newSearch);
    }

    const handleStock = async(id, accessToken) => {
        Swal.fire({
            title: "Are you Change Status Product To Sold Out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
            }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await updateToStockProduct(id, accessToken);
                    Swal.fire({
                        title: "Updated Status Success!",
                        icon: "success"
                    });
                    window.location.reload();
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

    const handleSoldOut = async(id, accessToken) => {
        Swal.fire({
            title: "Are you Change Status Product To Stock?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
            }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await updateToSoldoutProduct(id, accessToken);
                    Swal.fire({
                        title: "Updated Status Success!",
                        icon: "success"
                    });
                    window.location.reload();
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
        <div className="flex flex-col gap-3 px-2 w-full h-full">
            <div className="flex items-center w-full">
                <form
                    onSubmit={handleSubmitSearch}
                    className="flex w-1/2 h-full"
                >
                    <input
                        type="text"
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        placeholder="Search for products (By ID, Name, Status)" 
                        className="appearance-none block w-9/12 h-full bg-[#f1f5f9] text-gray-700 border border-gray-100 rounded-l-xl p-4 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-slate-100 text-black rounded-r-xl h-full p-4 flex items-center justify-center "
                    >
                        <FaSearch />
                    </button>
                </form>
            </div>
            {currentProducts && currentProducts.length > 0 ? (
                <div className="w-full flex flex-col gap-3">
                    <div className="w-full">
                        <table
                            className={`table-auto border-collapse ${border1} w-full h-5/6 mt-5`}
                        >
                            <thead>
                                <tr className="bg-[#ff676d] text-white text-center">
                                <td className={border2}>Image</td>
                                <td className={border2}>Product Name</td>
                                <td className={border2}>Category</td>
                                <td className={border2}>ID</td>
                                <td className={border2}>Status</td>
                                <td className={border2}></td>
                                </tr>
                            </thead>
                            <tbody>
                                {currentProducts.map((product) => {
                                    return (
                                        <tr key={product._id}>
                                            <td className={`${border1} w-28 h-full`}>
                                                <img
                                                    src={`${process.env.NEXT_PUBLIC_API_UPLOAD}/${product.name}/${product.images[0]}`}
                                                />
                                            </td>
                                            <td className={`${border1} pl-2`}>
                                                <Link className="font-semibold " href={`/productdetail/${product._id}`}>{product.name}</Link>
                                                {/* <div className="text-sm"><span className="font-medium">ID</span>: <span className="text-gray-500">{product._id}</span></div> */}
                                                {/* <div className="mt-2">ID: {product._id}</div> */}
                                            </td>
                                            <td className={`${border1} pl-2 text-center`}>{product.categoryId.name}</td>
                                            <td className={`${border1} text-center px-2`}>{product._id}</td>
                                            <td className={`${border1} text-center px-2`}>{product.status}</td>
                                            <td
                                                className={`${border1} flex items-center justify-center gap-2 h-full px-2`}
                                            >
                                                <div
                                                    onClick={() => handleSoldOut(product._id, accessToken)}
                                                    className="flex p-2 gap-1 rounded-lg text-white bg-rose-700 w-1/2  items-center justify-center cursor-pointer duration-300 hover:opacity-70"
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
                                                    SoldOut
                                                </div>
                                                <div
                                                    onClick={() => handleStock(product._id, accessToken)}
                                                    className="flex bg-lime-700 p-2 gap-1 rounded-lg text-white  w-1/2  items-center justify-center cursor-pointer duration-300 hover:opacity-70"
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
                                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                        />
                                                    </svg>
                                                    Stock
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full">
                        <Pagination 
                            totalProduct={dataProduct.length} 
                            productsPerPage={productsPerPage} 
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        />
                    </div> 
                </div>
            ) : (
                <div>Product Not Found</div>
            )}
        </div>
    );
};

export default ManagerStatusProduct;
