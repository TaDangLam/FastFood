'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUserGroup } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";
import { PiHamburgerFill } from "react-icons/pi";
import { MdPayments } from "react-icons/md";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { Bubble, Line, Pie, Doughnut, Bar, Area } from "react-chartjs-2";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { getAllOrderDeliveredAdmin, getAllProduct, getAllStaff, getAllCustomer } from "../api/route";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const category = useSelector(state => state.category.categories);
    const accessToken = sessionStorage.getItem('accessToken');
    const [product, setProduct] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [staff, setStaff] = useState([]);
    const [order, setOrder] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [totalRevenueOfYear, setTotalRevenueOfYear] = useState(0);
    const [totalOrderOfYear, setTotalOrderOfYear] = useState(0);

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value)); // Convert selected value to integer (year)
    };

    const fetchCustomer = async() => {
        try {
            const data = await getAllCustomer(accessToken);
            setCustomer(data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchStaff = async() => {
        try {
            const data = await getAllStaff(accessToken);
            setStaff(data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchProduct = async() => {
        try {
            const data = await getAllProduct();
            setProduct(data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchOrder = async() => {
        try {
            const data = await getAllOrderDeliveredAdmin(accessToken);
            setOrder(data);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchCustomer();
        fetchStaff();
        fetchProduct();
        fetchOrder();
    }, [])

    useEffect(() => {
        // Tính tổng doanh thu và số đơn hàng của năm đã chọn
        const calculateDataForSelectedYear = () => {
            let revenue = 0;
            let orderCount = 0;

            order.forEach((ord) => {
                const orderYear = new Date(ord.createdAt).getFullYear();
                if (orderYear === selectedYear) {
                    if (ord.status === 'Delivered') {
                        revenue += parseFloat(ord.totalPrice);
                    }
                    orderCount++;
                }
            });

            setTotalRevenueOfYear(revenue);
            setTotalOrderOfYear(orderCount);
        };

        calculateDataForSelectedYear();
    }, [selectedYear, order]);

    const calculateOrdersByMonth = () => {
        const ordersByMonth = Array(12).fill(0);
        order.forEach(orderItem => {
            const orderYear = new Date(orderItem.createdAt).getFullYear();
            if (orderYear === selectedYear) {
                const month = new Date(orderItem.createdAt).getMonth();
                ordersByMonth[month]++;
            }
        });
        return ordersByMonth;
    };
    
    const calculateProductsBoughtByMonth = () => {
        const productsBoughtByMonth = Array(12).fill(0);
        order.forEach(orderItem => {
            const orderYear = new Date(orderItem.createdAt).getFullYear();
            if (orderYear === selectedYear) {
                const month = new Date(orderItem.createdAt).getMonth();
                orderItem.orderDetail.forEach(item => {
                    productsBoughtByMonth[month] += item.quantity;
                });
            }
        });
        return productsBoughtByMonth;
    };

    const calculateProductsByCategory = () => {
        const productsByCategory = {};
        product.forEach(productItem => {
            const category = productItem.categoryId.name; // Lấy tên loại sản phẩm
            if (!productsByCategory[category]) {
                productsByCategory[category] = 0;
            }
            productsByCategory[category]++;
        });
        return productsByCategory;
    };

    const productsByCategory = calculateProductsByCategory();

    const total = customer.length + staff.length;
    // const customerPercentage = (customer.length / total) * 100;
    // const staffPercentage = (staff.length / total) * 100;
    const customerCount = customer.length;
    const staffCount = staff.length;

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];


    // const totalRevenue = () => {
    //     const revenue = order.reduce((total, ord) => {
    //         const orderPrice = parseFloat(ord.totalPrice);
    //         return total + orderPrice;
    //     }, 0);
    //     return revenue;
    // }

    const calculateMonthlyRevenue = () => {
        const monthlyRevenue = Array(12).fill(0);
        order.forEach(orderItem => {
            const orderYear = new Date(orderItem.createdAt).getFullYear();
            if (orderYear === selectedYear && orderItem.status === 'Delivered') {
                const month = new Date(orderItem.createdAt).getMonth();
                const orderPrice = parseFloat(orderItem.totalPrice);
                monthlyRevenue[month] += orderPrice;
            }
        });
        return monthlyRevenue;
    };
    // console.log(product)
    // console.log(customer)
    // console.log(category);
    // console.log(staff)
    // console.log(order)
    // console.log(totalRevenue()) ;
    
    return ( 
        <div className="flex flex-col gap-6 h-full w-full p-2">
            <div className="flex gap-5 items-center justify-between w-full ">
                <Link href={'/dashboard'} className="flex items-center p-2  gap-2 bg-gradient-to-r from-[#005AA7] to-[#36D1DC] text-white  border h-full w-1/4 rounded-xl hover:bg-[#4b6cb7] hover:shadow-xl hover:opacity-70 duration-500">
                    <div className="flex items-center justify-center w-1/3 h-full font-semibold text-5xl"><FaHandHoldingDollar /></div>
                    <div className="flex flex-col w-2/3 py-2 h-full ">
                        <div className="w-full h-2/4 flex items-center justify-center text-4xl font-semibold">{totalRevenueOfYear.toFixed(2)}</div>
                        <div className="w-full h-2/4 flex items-center justify-center text-sm">Total Revenue Of Year</div>
                    </div>
                </Link>
                <Link href={`/dashboard/user?user=Customer`} className="flex items-center p-2  gap-2 bg-gradient-to-r from-[#005AA7] to-[#36D1DC] text-white border h-full w-1/4 rounded-xl hover:bg-[#4b6cb7] hover:shadow-xl hover:opacity-70 duration-500">
                    <div className="flex items-center justify-center w-1/3 h-full font-semibold text-5xl"><FaUserTie/></div>
                    <div className="flex flex-col w-2/3 py-2 h-full">
                        <div className="w-full h-2/4 flex items-center justify-center text-4xl font-semibold">{staff.length + customer.length}</div>
                        <div className="w-full h-2/4 flex items-center justify-center text-sm">Availabel User</div>
                    </div>
                </Link>
                <Link href={'/dashboard/product'} className="flex items-center p-2  gap-2 bg-gradient-to-r from-[#005AA7] to-[#36D1DC] text-white border h-full w-1/4 rounded-xl hover:bg-[#4b6cb7] hover:shadow-xl hover:opacity-70 duration-500">
                    <div className="flex items-center justify-center w-1/3 h-full font-semibold text-5xl"><PiHamburgerFill/></div>
                    <div className="flex flex-col w-2/3 py-2 h-full">
                        <div className="w-full h-2/4 flex items-center justify-center text-4xl font-semibold">{product.length}</div>
                        <div className="w-full h-2/4 flex items-center justify-center text-sm">Available Product</div>
                    </div>
                </Link>
                <Link href={'/dashboard/order?status=Delivered'} className="flex items-center p-2  gap-2 bg-gradient-to-r from-[#005AA7] to-[#36D1DC] text-white border h-full w-1/4 rounded-xl hover:bg-[#4b6cb7] hover:shadow-xl hover:opacity-70 duration-500">
                    <div className="flex items-center justify-center w-1/3 h-full font-semibold text-5xl"><MdPayments/></div>
                    <div className="flex flex-col w-2/3 py-2 h-full">
                        <div className="w-full h-2/4 flex items-center justify-center text-4xl font-semibold">{totalOrderOfYear}</div>
                        <div className="w-full h-2/4 flex items-center justify-center text-sm">Total Order Of Year</div>
                    </div>
                </Link>
            </div>
            <div className="flex flex-col gap-10 w-full h-5/6">
                <div className=" w-full h-1/2 rounded-xl">
                    <div className="flex items-center gap-2">
                        <label htmlFor="yearSelect" className="text-xl font-semibold">Select Year:</label>
                        <select
                            id="yearSelect"
                            value={selectedYear}
                            onChange={handleYearChange}
                            className="p-2 border rounded-md"
                        >
                            {[...Array(new Date().getFullYear() - 2021).keys()].map((year) => (
                                <option key={2022 + year} value={2022 + year}>{2022 + year}</option>
                            ))}
                        </select>
                    </div>
                    <Line  
                        data={{
                            labels: months,
                            datasets: [
                                {
                                    label: "Order",
                                    data: calculateOrdersByMonth(),
                                    backgroundColor: '#005AA7',
                                    borderColor: '#005AA7',
                                    borderWidth: 3
                                },
                                {
                                    label: "Products Bought",
                                    data: calculateProductsBoughtByMonth(),
                                    backgroundColor: '#FF6384',
                                    borderColor: '#FF6384',
                                    borderWidth: 3
                                },
                                {
                                    label: "Monthly Revenue",
                                    data: calculateMonthlyRevenue(),
                                    backgroundColor: '#36D1DC',
                                    borderColor: '#36D1DC',
                                    borderWidth: 3
                                }
                            ]
                        }}
                        options={{
                            maintainAspectRatio: false,
                            plugins: {
                                title: {
                                    display: true,
                                    text: `Number of orders, products bought, and total revenue by month (${selectedYear})`,
                                    font: {
                                        size: 16,
                                        weight: 'bold'
                                    }
                                }
                            }
                        }}
                    />
                </div>
                <div className="flex gap-4 w-full h-1/2 rounded-xl pt-5">
                    <div className="flex items-center justify-center  h-full w-1/2 text-center">
                        <Pie
                            data={{
                                labels: Object.keys(productsByCategory),
                                datasets: [{
                                    label: 'Products by Category',
                                    data: Object.values(productsByCategory),
                                    backgroundColor: [
                                        '#FF6384',
                                        '#36A2EB',
                                        '#FFCE56',
                                        '#bad36e',
                                        '#33b7bc',
                                        '#f1884c'
                                        
                                    ],
                                    hoverOffset: 4,
                                }]
                            }}
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'Number of products by category',
                                        font: {
                                            size: 16,
                                            weight: 'bold'
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                    <div className="flex items-center justify-center h-full w-1/2">
                        <Pie
                            data={{
                                labels: ['Customers', 'Staff'],
                                datasets: [{
                                    label: 'Quantity',
                                    data: [customerCount, staffCount],
                                    backgroundColor: ['#FF6384', '#36A2EB'],
                                    hoverOffset: 4,
                                }]
                            }}
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'Number of Customers and Staff',
                                        font: {
                                            size: 16,
                                            weight: 'bold'
                                        }
                                    },
                                    
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>   
    );
}
 
export default Dashboard;