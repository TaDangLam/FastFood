'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { IoStar } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { PiHamburger, PiForkKnifeLight  } from "react-icons/pi";
import { LiaPizzaSliceSolid } from "react-icons/lia";
import { BsCupHot } from "react-icons/bs";
import { LuSoup, LuSalad  } from "react-icons/lu";
import { CiShoppingCart } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";

import { fetchAllCategory, getProductCategory } from "./api/route";
import { addToCart } from "@/lib/features/cart/cartSlice";

export default function Home() {
  const category = useSelector((state) => state.category.categories);
  const products = useSelector((state) => state.product.fewProducts);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const dispatch = useDispatch();
  const idCategory = process.env.NEXT_PUBLIC_BURGER_CATEGORY_ID;

  useEffect(() => {
    fetchAllCategory(dispatch)
      // .then(result => setCategory(result.data))
      .catch(error => console.log(error));
    
    getCateClick(idCategory);
  }, []);

  const handleAddToCart = async(item) => {
    await dispatch(addToCart(item));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Product Has Been Added to Cart",
      showConfirmButton: false,
      timer: 1500
    });
  }

  const getCateClick = async(cid) => {
    getProductCategory(cid, dispatch)
      // .then(result => setProduct(result.data))
      .catch(error => console.log(error));
    setSelectedCategoryId(cid);
  }
  
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

  // console.log(products);
  // console.log(selectedCategoryId);
  return (
    <div className="margin-component mt-[31px] h-full">
      <div className=" w-full h-1/4 relative">
          <img src="/468702ee8eea3bb4d92aaa06d9b1e923.jpg" alt="Background images" className=" w-full object-cover rounded-xl "/>
          <div className="">
            <div className="absolute top-1/4 left-40 text-9xl text-[#ffc139] font-bold">Food</div>
            <div className="absolute top-[350px] left-1/4 text-6xl text-white font-semibold">D E L I V E R Y</div>
            <Link href={`/category/${idCategory}`} className="text-white hover:text-[#ffc139] font-semibold duration-500"><div className="absolute top-2/4 left-1/4 bg-[#ffc139] hover:bg-white p-4 px-14 rounded-3xl">ORDER NOW</div></Link>
          </div>
      </div>

      <div className="flex h-1/4 w-full pt-16">
        <div className=" w-1/2">
          <img src="Untitled-1.webp"/>
        </div>
        <div className="flex flex-col gap-9 w-1/2">
          <div className="text-5xl font-semibold">BEST SALE ALWAYS</div>
          <div className="flex items-center gap-3">
            <div className="text-[#ffc139]"><IoStar /></div>
            <div className="text-[#ffc139]"><IoStar /></div>
            <div className="text-[#ffc139]"><IoStar /></div>
            <div className="text-[#ffc139]"><IoStar /></div>
          </div>
          <div>The perfect place to enjoy the life & delicious food with your
                friends! Our family has been in the restaurant business for a very
                long time. Nowadays we can proudly boast our reputation for a
                well known restaurant in our area. We are famous for the fabulous
                authentic cuisine, professional chef and dedicated staff….
          </div>
          <div className="w-full">
            <Link href={'/category/65f04dde81da17e4da64580f'} className="flex items-center justify-center bg-[#ffc139] p-5 w-16 text-white rounded-full hover:text-[#ffc139] hover:bg-white  hover:outline hover:outline-[#ffc139] duration-500"><FaPlus className="text-xl"/></Link>
          </div>
        </div>
      </div>

      <div className="flex gap-10 h-1/4 w-full pt-10">
        <div className="flex flex-col gap-8 p-5 h-full w-1/3">
          <div className="text-5xl font-semibold w-full">
            BEEF CLASSIC <span className="text-[#ffc139]">BURGERS</span> 
          </div>
          <div className="flex items-center gap-3">
            <div className="text-[#ffc139]"><IoStar /></div>
            <div className="text-[#ffc139]"><IoStar /></div>
            <div className="text-[#ffc139]"><IoStar /></div>
            <div className="text-[#ffc139]"><IoStar /></div>
            <div className="text-[#ffc139]"><IoStar /></div>
          </div>
          <div className="w-full">
            Try this delicious burger containing of two fried parts of a whole-grain bun, a juicy piece of beef, cheese and lettuce
          </div>
          <div className="w-full">
            <Link href={`/category/65f04a1c81da17e4da645807`} className="flex items-center justify-center bg-[#ffc139] p-5 w-16 text-white rounded-full hover:text-[#ffc139] hover:bg-white hover:outline hover:outline-[#ffc139] duration-500"><FaPlus className="text-xl"/></Link>
          </div>
          <div className="w-full">
            <img src="/Untitled-2.webp"/>
          </div>
        </div>

        <div className="flex flex-col gap-8 p-5 h-full w-1/3 ">
            <div className="w-full">
              <img src="/Untitled-3.webp"/>
            </div>
            <div className="text-5xl font-semibold w-full">
              THE BEST <span className="text-[#ffc139]">PASTA</span> 
            </div>
            <div className="flex items-center gap-3">
              <div className="text-[#ffc139]"><IoStar /></div>
              <div className="text-[#ffc139]"><IoStar /></div>
              <div className="text-[#ffc139]"><IoStar /></div>
              <div className="text-[#ffc139]"><IoStar /></div>
              <div className="text-[#ffc139]"><IoStar /></div>
            </div>
            <div className="w-full">
              Our pasta with seafood is mixed perfectly with a glass of white wine
            </div>
            <div className="w-full">
              <Link href={'/category/65f04de981da17e4da645813'} className="flex items-center justify-center bg-[#ffc139] p-5 w-16 text-white rounded-full hover:text-[#ffc139] hover:bg-white  hover:outline hover:outline-[#ffc139] duration-500"><FaPlus className="text-xl"/></Link>
            </div>
        </div>

        <div className="flex flex-col gap-8 p-5 h-full w-1/3 ">
          <div className="text-5xl font-semibold w-full">
            SEASON <span className="text-[#ffc139]">SOUP</span> 
          </div>
          <div className="flex items-center gap-3">
            <div className="text-[#ffc139]"><IoStar /></div>
            <div className="text-[#ffc139]"><IoStar /></div>
            <div className="text-[#ffc139]"><IoStar /></div>
            <div className="text-[#ffc139]"><IoStar /></div>
            <div className="text-[#ffc139]"><IoStar /></div>
          </div>
          <div className="w-full">
            We offer you a special dish - our season soup containing season vegetables
          </div>
          <div className="w-full">
            <Link href={'/category/65f04ded81da17e4da645815'} className="flex items-center justify-center bg-[#ffc139] p-5 w-16 text-white rounded-full hover:text-[#ffc139] hover:bg-white  hover:outline hover:outline-[#ffc139] duration-500"><FaPlus className="text-xl"/></Link>
          </div>
          <div className="w-full">
            <img src="/Untitled-4.webp"/>
          </div>
        </div>

      </div>

      <div className="h-1/4 w-full pt-14">
        <div className="flex w-full h-1/3 p-5 ">
            {category.map(cate => (
              <div key={cate._id} className="flex flex-col items-center gap-3 w-2/12 h-full cursor-pointer hover:text-[#ffc139] duration-200" onClick={() => getCateClick(cate._id)}>{getIconCate(cate.name)} <span className="text-lg ">{cate.name}</span></div>
            ))}
        </div>
        <div className="flex gap-4 w-full h-2/3 p-5 pt-10 ">
          {selectedCategoryId && products?.map(product => (
            <div 
              key={product._id} 
              className="flex flex-col gap-2 w-1/4  p-6 border border-[#d4d4d4] hover:shadow-xl duration-500 relative py-18"
            >
              <Link className="w-full h-4/6 transition-opacity duration-300 hover:opacity-75" href={`/productdetail/${product._id}`}>
                <img src={`${process.env.NEXT_PUBLIC_API_UPLOAD}/${product.name}/${product.images[0]}`} 
                      alt="images product" 
                      className="h-full w-full object-contain"/>
              </Link>
              <div className="w-full h-1/6 text-lg font-semibold ">{product.name}</div>
              <div className="flex items-center justify-between w-full h-1/6 ">
                <div className="flex flex-col gap-2 justify-between w-1/2">
                  <div className="h-1/2 w-full text-[#ffc139] text-2xl font-semibold">$ {product.price}</div>
                  <div className="flex flex-col h-1/2 w-full">
                    <div><span className="font-semibold">Sold</span>: {product.sold}</div>
                    <div><span className="font-semibold">Review</span>: {product.reviewId.length}</div>
                  </div>
                </div>
                {product?.status === 'SoldOut' ? (
                    <div className="absolute top-0 right-0 w-[120px] h-[150px]">
                      <img src='/corner-sold-out-ribbon-banner-260nw-1325587067-Photoroom.png-Photoroom.png' className="w-full h-full"/>
                    </div>
                ) : (
                    <div onClick={() => handleAddToCart(product)} className="flex items-center justify-center bg-[#ffc139] p-3 w-12 h-12 text-white rounded-full hover:text-[#ffc139] hover:bg-white  hover:outline hover:outline-[#ffc139] duration-500 cursor-pointer">
                      <CiShoppingCart className="w-full h-full"/>
                    </div>
                )}
              </div>
              {/* <div className="w-full bg-blue-200">

              </div> */}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
