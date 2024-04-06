'use client'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import Navbar from '@/components/Navbar';
import { getAllProductByCategory } from '@/app/api/route';
import Pagination from '@/components/Pagination';
import { setAllProductByCategory } from '@/lib/features/product/productSlice';

const Category = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const category = useSelector(state => state.category.categories);
    const products = useSelector((state) => state.product.allProductCategory);
    const idCategory = process.env.NEXT_PUBLIC_BURGER_CATEGORY_ID;
    const [sortOrder, setSortOrder] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;                                                      // Số sản phẩm trên mỗi trang
    const indexOfLastProduct = currentPage * productsPerPage;                       // chỉ mục cuối
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;               // chỉ mục đầu
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    useEffect(() => {
        if(id) {
            getAllProductByCategory(id, dispatch);
        }
    }, [id])

    const handleSortChange = (option) => {
        if (option !== sortOrder) {
            setSortOrder(option);
            const sortedProducts = [...products].sort((a, b) => {
                if (option === 'priceAsc') {
                    return a.price - b.price;
                } else if (option === 'priceDesc') {
                    return b.price - a.price;
                } else if (option === 'hot') {
                    return b.sold - a.sold;
                } else if (option === 'Latest') {
                    return new Date(b.createdAt) - new Date(a.createdAt)
                } else {
                    return new Date(a.createdAt) - new Date(b.createdAt)
                }
            });
            dispatch(setAllProductByCategory(sortedProducts));
        }
    };

    console.log(currentProducts)
    return ( 
        <div className="margin-component mt-[31px] ">
            <div className="w-full h-1/4">
                <img src="/33ef8b9c0b902154a6cd4103a21275ef.jpg" className="w-full h-[150px] object-cover rounded-md px"/>
            </div>
            <div className="flex gap-5 h-3/4 w-full pt-16">
                <div className='flex flex-col gap-2.5 h-full w-3/12 py-6'>
                    <div className='w-full h-1/3'><Navbar id={id}/></div>
                    <div className='w-full h-1/3 bg-rose-200'>
                        <img src="/burger_advertising_poster_by_rightside24h_de3suec-fullview.jpg" alt="banner"/>
                    </div>
                    <div className='w-full h-1/3 bg-rose-200'>
                        <img src="/Hamburger-Advertisement-Poster-Template-Awesomeflyer-com-668x1024.webp" alt="banner"/>
                    </div>
                </div>
                <div className='flex flex-col h-full w-9/12 gap-3 py-6 '>
                    <div className='flex justify-end w-full h-1/6 '>
                        <select 
                            className='border-2 p-2 rounded-lg'
                            value={sortOrder} 
                            onChange={(e) => handleSortChange(e.target.value)}
                        >
                            <option value=''>Sort</option>
                            <option value='hot'>Sold: A Lot</option>
                            <option value="priceAsc">Price: Low to High</option>
                            <option value="priceDesc">Price: High to Low</option>
                            <option value="Latest">Time: Latest</option>
                            <option value="Oldest">Time: Oldest</option>
                        </select>
                    </div>
                    <div className='grid grid-cols-3 gap-6 w-full h-4/6 pb-6'>
                        {currentProducts.map(product => (
                            <Link href={`/productdetail/${product._id}`} className='flex flex-col gap-4 w-full h-full border p-5  hover:shadow-xl duration-300 relative'>
                                <div className='w-full h-3/5'><img src={`${process.env.NEXT_PUBLIC_API_UPLOAD}/${product.name}/${product.images[0]}`} alt="photo product" className='w-full h-full object-contain'/></div>
                                <div className='flex flex-col w-full h-2/5'>
                                    <div className='w-full h-2/3 text-lg font-medium'>{product.name}</div>
                                    <div className='flex items-center justify-between w-full h-1/3'>
                                        <div className='text-[#ffc139] text-2xl font-semibold '><span className=''>$ {product.price}</span></div>
                                        <div className='text'><span className="font-semibold">Sold</span> : {product.sold}</div>
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
                    <div className='w-full h-1/6 '>
                        <Pagination 
                            totalProduct={products.length} 
                            productsPerPage={productsPerPage} 
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </div>
            
        </div>
     );
}
 
export default Category;