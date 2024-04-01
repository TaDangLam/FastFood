'use client'
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { LiaChevronCircleRightSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

import { createOrder, getDetailUser } from "../api/route";
import Paypal from "@/components/Paypal";
// sb-47xx4930095432@personal.example.com
const CheckoutPage = () => {
    const router = useRouter();
    // const user = useSelector(state => state.auth.user);
    // const accessToken = useSelector(state => state.auth.accessToken);
    const userString = sessionStorage.getItem('user');
    const userSession = JSON.parse(userString)
    const accessToken = sessionStorage.getItem('accessToken');
    const [user, setUser] = useState(null);
    const cartsData = useSelector(state => state.cart.cart);
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [province, setProvince] = useState('');
    const [phone, setPhone] = useState('');
    const [total, setTotal] = useState(0);
    const [statusPaid, setStatusPaid] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedPaymentMethod ,setSelectedPaymentMethod] = useState('COD');

    const calcuTotal = () => {
        const calc = cartsData.reduce((total, cart) => total + cart.total, 0);
        setTotal(calc.toFixed(2));
    }

    useEffect(() => {
        calcuTotal();
        getDetailUserr();
    }, [cartsData])

    const getDetailUserr = async() => {
        try {
            const resposne = await getDetailUser(userSession._id, accessToken);
            setUser(resposne);
            setEmail(resposne.email);
            setFullName(resposne.fullName);
            setPhone(resposne.phone);
            setSelectedAddress(resposne.address[0])
        } catch (error) {
            console.log(error);
        }
    }
    
    const handleAddressChange = (event) => {
        const selectedId = event.target.value;
        const selectedAddr = user.address.find(addr => addr._id === selectedId);
        setSelectedAddress(selectedAddr);
    };

    const handleToNewAddress = () => {
        router.push('/information/address/newAddress');
    }

    const handleDirectPayment = async() => {
        try {
            const payload = {
                orderBy: user._id,
                paymentType: selectedPaymentMethod,
                totalPrice: total,
                orderDetail: cartsData.map(cartItem => ({
                    productId: cartItem.item._id, 
                    quantity: cartItem.quantity,
                    totalPriceProduct: cartItem.total 
                })),
                isPaid: statusPaid,
                address: selectedAddress
            } 
            await createOrder(payload, accessToken);
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                background: '#f1f5f9',
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Payment is Success"
              });
            router.push('/information/order');
        } catch (error) {
            console.log(error)
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

    // console.log('selectedAddress',selectedAddress);
    console.log(user)

    return( 
        <div className="margin-component mt-[31px] flex flex-col gap-5">
            <div className="flex items-center gap-5 justify-center w-full h-1/6 py-8">
                <span className="text-xl font-semibold cursor-pointer hover:text-[#ff9b49]" onClick={() => router.back()}> Shopping Cart</span>
                <span className="text-xl"><LiaChevronCircleRightSolid /></span>
                <span className="text-xl font-semibold text-[#ff9b49]"> Checkout</span>
                <span className="text-xl"><LiaChevronCircleRightSolid /></span>
                <span className="text-xl font-semibold"> Order Detail</span>
            </div>
            <form  className="flex gap-3 w-full h-10/12">
                <div className="flex flex-col gap-8 bg-white w-3/6 px-3 py-6 h-full rounded-xl">  
                    <div className="w-full text-2xl font-bold h-1/3 text-[#ff8349]">Payment Information</div>
                    <div className="flex flex-col gap-5 w-full h-2/3">
                        <div className="w-full">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Name
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="fullName"
                                type="text"
                                readOnly
                                value={fullName}
                                onChange={e => setFullName(e.target.value)}
                                placeholder=""
                            />
                        </div>

                        <div className="w-full ">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Email
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="email"
                                type="text"
                                readOnly
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder=""
                            />
                        </div>
                        
                        <div className="w-full ">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Phone
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="phone"
                                type="text"
                                readOnly
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                placeholder=""
                            />
                        </div>

                        {(user && user.address && user.address.length > 0) ? (
                            <div className="w-full ">
                                <label className="flex items-center uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    (<span className="text-red-500 font-semibold">*</span>) Address 
                                </label>
                                <select 
                                    name="" 
                                    id=""
                                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    onChange={handleAddressChange}
                                    >
                                        {user?.address.map(addr => (
                                            <option key={addr._id} value={addr._id}>{`${addr.street}, ${addr.city}, ${addr.province}`}</option>
                                        ))}
                                </select>
                                <div className="flex justify-center text-sm text-[#ff834a]  cursor-pointer font-light w-3/12" onClick={handleToNewAddress}>More New Address</div>
                            </div>
                        ) : (
                            <div className="flex gap-5 w-full items-center">
                                <div className="text-lg font-semibold">Please Add New Address:</div>
                                <div className="bg-[#ff834a] px-8 py-1 cursor-pointer rounded-xl text-white duration-500 hover:opacity-80" onClick={handleToNewAddress}>New</div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-3 bg-white w-3/6 rounded-xl px-4 py-6 h-full border-2 border-[#ff8349]">
                    <div className="w-full h-1/6 text-[#ff8349] text-2xl font-bold">Your Order</div>
                    <div className="flex flex-col gap-6 p-7 w-full h-3/6">
                        <div className="flex items-center justify-between border-b-2 border-[#ff8349] h-full w-full">
                            <div className="h-full w-7/12 text-xl font-semibold">Product</div>
                            <div className="h-full w-3/12 text-center text-xl font-semibold">Quantity</div>
                            <div className="h-full w-2/12 text-xl font-semibold">Price</div>
                        </div>
                        {cartsData.map(cartItem => (
                            <div className="flex items-center justify-between border-b-2 border-slate-100 h-full w-full" key={cartItem._id}>
                                <div className="h-full w-7/12">{cartItem.item.name}</div>
                                <div className="h-full w-3/12 text-center">{cartItem.quantity}</div>
                                <div className="h-full w-2/12 flex">{cartItem.total.toFixed(2)} </div>
                            </div>
                        ))}
                        <div className="flex items-center justify-between border-b-2 border-[#ff8349] h-full w-full">
                            <div className="h-full w-6/12 text-xl font-semibold">Total:</div>
                            <div className="h-full w-2/12 text-xl font-semibold flex"><span className="text-[#ff8349]">{total}</span> <BsCurrencyDollar/></div>
                        </div>
                    </div>
                    <div className="w-full h-1/6 px-7 Lamta">
                        <div className="flex items-center gap-2">
                            <input 
                                type="radio" 
                                id="cod" 
                                name="paymentMethod" 
                                value="COD" 
                                checked={selectedPaymentMethod === "COD"} 
                                onChange={() => setSelectedPaymentMethod("COD")} 
                            />
                            <label htmlFor="cod" className="font-semibold">Direct Payment (COD)</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input 
                                type="radio" 
                                id="Paypal" 
                                name="paymentMethod" 
                                value="PayPal" 
                                checked={selectedPaymentMethod === "Paypal"} 
                                onChange={() => setSelectedPaymentMethod("Paypal")} 
                            />
                            <label htmlFor="Paypal" className="font-semibold">Online Payment (Paypal)</label>
                        </div>
                    </div>
                    {selectedPaymentMethod === "COD" ? (
                        <button type="button" onClick={handleDirectPayment} className="w-full h-1/6 bg-rose-500 p-2 text-white rounded-lg hover:bg-rose-800">Order</button>
                    ) : (
                        <div className="w-full h-1/6">
                           <Paypal 
                                amount={total} 
                                payload={{
                                    orderBy: user._id,
                                    paymentType: selectedPaymentMethod,
                                    totalPrice: total,
                                    orderDetail: cartsData.map(cartItem => ({
                                        productId: cartItem.item._id, 
                                        quantity: cartItem.quantity,
                                        totalPriceProduct: cartItem.total 
                                    })),
                                    isPaid: !statusPaid,
                                    address: selectedAddress
                                }}
                                accessToken={accessToken}
                            />
                        </div>
                    )}
                </div>
            </form>
        </div>
    )
}

export default CheckoutPage;
