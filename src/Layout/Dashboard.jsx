import { useState } from 'react';
import { BsFillCalendar3EventFill } from "react-icons/bs";
import { FaCalendar, FaHome, FaShoppingCart, FaStar, FaWallet, FaBars, FaTimes, FaList, FaUtensils, FaUsers } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';
import useCart from '../hooks/useCart';

const getActiveClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ${isActive
        ? "bg-white text-[#D1A054] font-semibold"
        : "text-white hover:bg-[#a77b3f]"
    }`;

const Dashboard = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { logOut } = useAuth();
    const [cart] = useCart();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const [isAdmin] = useAdmin();

    const adminLinks = [
        { icon: <FaHome />, text: "My Home", path: "/dashboard/adminHome" },
        { icon: <FaUtensils />, text: "Add Item", path: "/dashboard/addItems" },
        { icon: <FaList />, text: "Manage Items", path: "/dashboard/manageItems" },
        { icon: <FaCalendar />, text: "Manage Bookings", path: "/dashboard/bookings" },
        { icon: <FaUsers />, text: "All Users", path: "/dashboard/users" },
    ];

    const userLinks = [
        { icon: <FaHome />, text: "My Home", path: "/dashboard/userHome" },
        { icon: <FaWallet />, text: "Payment History", path: "/dashboard/paymentHistory" },
        { icon: <FaCalendar />, text: "Reservation", path: "/dashboard/reservation" },
        { icon: <FaShoppingCart />, text: `My Cart(${cart?.length})`, path: "/dashboard/cart" },
        { icon: <FaStar />, text: "Add Review", path: "/dashboard/review" },
        { icon: <BsFillCalendar3EventFill />, text: "My Booking", path: "/dashboard/booking" },
    ];

    return (
        <div className="flex relative ">
            {/* Mobile Hamburger Button */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 text-[#D1A054]"
                onClick={toggleSidebar}
            >
                {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {/* Sidebar */}
            <div
                className={`
                    fixed md:static top-0 left-0 min-h-screen w-64 bg-[#D1A054] 
                    transform transition-transform duration-300 z-40
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:translate-x-0 md:block
                `}
            >
                <div className="w-4/5 mx-auto my-10">
                    <Link to={'/'} className="block text-center">
                        <h1 className="text-2xl font-bold text-white">Bistro Boss</h1>
                        <p className="text-sm text-white">R E S T A U R A N T</p>
                    </Link>
                </div>

                <ul className="w-4/5 mx-auto flex flex-col text-lg gap-4">
                    {
                        isAdmin ?
                            (
                                adminLinks.map((item, index) => (
                                    <li key={index} className="text-sidebar-text">
                                        <NavLink
                                            className={getActiveClass}
                                            to={item.path}
                                            onClick={() => setIsSidebarOpen(false)}
                                        >
                                            {item.icon} {item.text}
                                        </NavLink>
                                    </li>
                                ))
                            )
                            :
                            (
                                userLinks.map((item, index) => (
                                    <li key={index} className="text-sidebar-text">
                                        <NavLink
                                            className={getActiveClass}
                                            to={item.path}
                                            onClick={() => setIsSidebarOpen(false)}
                                        >
                                            {item.icon} {item.text}
                                        </NavLink>
                                    </li>
                                ))
                            )
                    }

                </ul>

                <div className="w-4/5 mx-auto my-10 border border-white"></div>
                {/* Shared Links */}
                {/* Home and Logout Links */}
                <div className="w-4/5 mx-auto space-y-4">
                    <NavLink
                        to="/"
                        className="flex items-center gap-3 text-lg text-white hover:bg-[#a77b3f] px-4 py-2 rounded-lg"
                    >
                        <FaHome /> Home
                    </NavLink>
                    <NavLink
                        to="/menu"
                        className="flex items-center gap-3 text-lg text-white hover:bg-[#a77b3f] px-4 py-2 rounded-lg"
                    >
                        <FaList /> Menu
                    </NavLink>
                    <button onClick={logOut}
                        className="w-full flex items-center gap-3 text-white hover:bg-[#a77b3f] px-4 py-2 rounded-lg"
                    >
                        <FaTimes /> Logout
                    </button>
                </div>
            </div>

            {/* Overlay for Mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Main Content */}
            <div className="flex-1 w-full md:w-4/5 ml-0 md:ml-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;