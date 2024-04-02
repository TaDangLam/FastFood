'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUserGroup } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";
import { PiHamburgerFill } from "react-icons/pi";
import { MdPayments } from "react-icons/md";
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

    console.log(order);
    useEffect(() => {
        fetchCustomer();
        fetchStaff();
        fetchProduct();
        fetchOrder();
    }, [])

    const calculateOrdersByMonth = () => {
        const ordersByMonth = Array(12).fill(0); // Tạo mảng 12 phần tử ban đầu có giá trị 0
        order.forEach(orderItem => {
            const month = new Date(orderItem.createdAt).getMonth(); // Lấy tháng từ ngày tạo đơn hàng
            ordersByMonth[month]++; // Tăng số đơn hàng của tháng tương ứng
        });
        return ordersByMonth;
    };

    const calculateProductsBoughtByMonth = () => {
        const productsBoughtByMonth = Array(12).fill(0); // Tạo mảng 12 phần tử ban đầu có giá trị 0
        order.forEach(orderItem => {
            const month = new Date(orderItem.createdAt).getMonth(); // Lấy tháng từ ngày tạo đơn hàng
            orderItem.orderDetail.forEach(item => {
                productsBoughtByMonth[month] += item.quantity; // Cộng số lượng sản phẩm trong đơn hàng vào tháng tương ứng
            });
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
    const customerPercentage = (customer.length / total) * 100;
    const staffPercentage = (staff.length / total) * 100;

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // console.log(product)
    // console.log(customer)
    // console.log(category);
    // console.log(staff)
    // console.log(order)

    return ( 
        <div className="flex flex-col gap-6 h-full w-full p-2">
            <div className="flex gap-5 items-center justify-between w-full h-1/6">
                <Link href={'/dashboard/user'} className="flex items-center p-2  gap-2 bg-gradient-to-r from-[#005AA7] to-[#36D1DC] text-white  border h-full w-1/4 rounded-xl hover:bg-[#4b6cb7] hover:shadow-xl hover:opacity-70 duration-500">
                    <div className="flex items-center justify-center w-1/3 h-full font-semibold text-5xl"><FaUserGroup /></div>
                    <div className="flex flex-col w-2/3 py-2 h-full">
                        <div className="w-full h-2/4 flex items-center justify-center text-5xl font-semibold">{customer.length}</div>
                        <div className="w-full h-2/4 flex items-center justify-center text-sm">Available Customer</div>
                    </div>
                </Link>
                <Link href={'/dashboard/user/staff'} className="flex items-center p-2  gap-2 bg-gradient-to-r from-[#005AA7] to-[#36D1DC] text-white border h-full w-1/4 rounded-xl hover:bg-[#4b6cb7] hover:shadow-xl hover:opacity-70 duration-500">
                    <div className="flex items-center justify-center w-1/3 h-full font-semibold text-5xl"><FaUserTie/></div>
                    <div className="flex flex-col w-2/3 py-2 h-full">
                        <div className="w-full h-2/4 flex items-center justify-center text-5xl font-semibold">{staff.length}</div>
                        <div className="w-full h-2/4 flex items-center justify-center text-sm">Available Staff</div>
                    </div>
                </Link>
                <Link href={'/dashboard/product'} className="flex items-center p-2  gap-2 bg-gradient-to-r from-[#005AA7] to-[#36D1DC] text-white border h-full w-1/4 rounded-xl hover:bg-[#4b6cb7] hover:shadow-xl hover:opacity-70 duration-500">
                    <div className="flex items-center justify-center w-1/3 h-full font-semibold text-5xl"><PiHamburgerFill/></div>
                    <div className="flex flex-col w-2/3 py-2 h-full">
                        <div className="w-full h-2/4 flex items-center justify-center text-5xl font-semibold">{product.length}</div>
                        <div className="w-full h-2/4 flex items-center justify-center text-sm">Available Product</div>
                    </div>
                </Link>
                <Link href={'/dashboard/order'} className="flex items-center p-2  gap-2 bg-gradient-to-r from-[#005AA7] to-[#36D1DC] text-white border h-full w-1/4 rounded-xl hover:bg-[#4b6cb7] hover:shadow-xl hover:opacity-70 duration-500">
                    <div className="flex items-center justify-center w-1/3 h-full font-semibold text-5xl"><MdPayments/></div>
                    <div className="flex flex-col w-2/3 py-2 h-full">
                        <div className="w-full h-2/4 flex items-center justify-center text-5xl font-semibold">{order.length}</div>
                        <div className="w-full h-2/4 flex items-center justify-center text-sm">Total Order</div>
                    </div>
                </Link>
            </div>
            <div className="flex flex-col gap-5 w-full h-5/6">
                <div className=" w-full h-1/2 rounded-xl">
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
                                }
    
                            ]
                        }}
                        options={{
                            maintainAspectRatio: false, // Loại bỏ tỷ lệ khung hình
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Number of orders and products by monthy',
                                    font: {
                                        size: 16,
                                        weight: 'bold'
                                    }
                                }
                            }
                        }}
                    />
                </div>
                <div className="flex gap-4 w-full h-1/2 rounded-xl">
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
                                    data: [customerPercentage, staffPercentage],
                                    backgroundColor: ['#FF6384', '#36A2EB'],
                                    hoverOffset: 4,
                                }]
                            }}
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'Percentage of Customers and Staff',
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