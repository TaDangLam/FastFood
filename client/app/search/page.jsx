'use client'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { BsCurrencyDollar } from "react-icons/bs";

import { searchProduct } from '../api/route';
import Pagination from '@/components/Pagination';

const searchPage = () => {
    const keyword = useSearchParams().get('keyword');
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 16;                                                      
    const indexOfLastProduct = currentPage * productsPerPage;                       
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;              
    const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

    
    const fetchSearch = async(keyword) => {
        const newSearch = await searchProduct(keyword);
        setData(newSearch);
    }

    useEffect(() => {
        fetchSearch(keyword)
    }, [keyword]);
    // console.log(currentProducts);

    return (
        <div className='margin-component flex flex-col gap-5 p-3'>
            <div className='w-full p-1 flex justify-between'>
                <div className='text-xl bg-slate-200 rounded-lg p-2 font-semibold'>Search Results: <span className='text-btn font-semibold'>{data.length}</span></div>
                <div>
                    <select className='h-10 rounded-lg bg-slate-200'>
                        <option value="">Sort</option>
                        <option value="asc">Price: Low to High</option>
                        <option value="desc">Price: High to Low</option>
                    </select>
                </div>
            </div>
            <div className='grid grid-cols-4 gap-3'>
                {currentProducts.map(product => (
                    <Link href={`/productdetail/${product._id}`} className='relative h-full w-full border-2 hover:shadow-xl duration-300 hover:opacity-80'>
                        <div className='bg-white rounded-pd w-full h-full p-5'>
                                <div className='w-full h-4/6'><img src={`${process.env.NEXT_PUBLIC_API_UPLOAD}/${product.name}/${product.images[0]}`}  alt="product-image" className='h-full w-full object-contain rounded-pd '/></div>
                                <div className='h-1/6 w-full text-lg font-semibold '>{product.name}</div>
                                <div className=' h-1/6 w-full mb-0 flex items-center justify-between'>
                                    <div className='flex font-semibold text-2xl text-[#ffa460] '>{product.price} <BsCurrencyDollar /></div>
                                    <div className=''><span className="font-semibold">Sold</span> : {product.sold}</div>
                                </div>
                        </div>
                        {product?.status === 'SoldOut' && (
                            <div className="absolute top-0 right-0 w-[120px] h-[150px]">
                                <img src='/corner-sold-out-ribbon-banner-260nw-1325587067-Photoroom.png-Photoroom.png' className="w-full h-full"/>
                            </div>
                        )}
                    </Link>
                ))}
            </div>
            <div className='flex w-full justify-center'>
                    <Pagination 
                        totalProduct={data.length} 
                        productsPerPage={productsPerPage} 
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
            </div>
        </div>
    );
}

export default searchPage;