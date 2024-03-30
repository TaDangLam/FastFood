'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PiHamburger, PiForkKnifeLight  } from "react-icons/pi";
import { LiaPizzaSliceSolid } from "react-icons/lia";
import { BsCupHot } from "react-icons/bs";
import { LuSoup, LuSalad  } from "react-icons/lu";


const Navbar = ({ id }) => {
    const category = useSelector(state => state.category.categories);

    const getIconCate = (name) => {
        switch (name) {
          case 'BURGER':
              return <PiHamburger className="h-14 w-14"/>;
          case 'PIZZA':
              return <LiaPizzaSliceSolid className="h-14 w-14" />;
          case 'DRINKS':
              return <BsCupHot className="h-14 w-14" />;
          case 'PASTA':
                  return <PiForkKnifeLight className="h-14 w-14" />;
          case 'SOUP':
                  return <LuSoup className="h-14 w-14" />;        
          case 'SALAD':
              return <LuSalad className="h-14 w-14" />;
          default:
              return null;
        }
    };

    // const handleActiveClick = (idCategory) => {
    //     setActiveCategory(idCategory);
    // }
    // console.log(idCategory)
    return(
        <div className='flex flex-col gap-5'>
            {category.map(cate => (
                <Link 
                    key={cate._id}
                    href={`/category/${cate._id}`} 
                    className={`flex items-center gap-10 px-5 py-2 hover:shadow-lg duration-300 ${id === cate._id ? 'text-white bg-[#ffc139] shadow-lg' : 'bg-[#f4f6f3] hover:text-[#ffc139]'}`} 
                    
                >
                        {getIconCate(cate.name)} <span className="text-xl font-medium ">{cate.name}</span>
                </Link>
            ))}
        </div>
    )
}

export default Navbar;
