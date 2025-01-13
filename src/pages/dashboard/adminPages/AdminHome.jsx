import { useQuery } from "@tanstack/react-query";
import { 
    FaUsers, 
    FaHamburger, 
    FaShoppingCart, 
    FaDollarSign, 
    FaClipboardList,
    FaMoneyBillWave
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['adminStats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/adminStats');
            return res.data;
        }
    });

    // Destructure stats with default values
    const {
        userCount = 0,
        menuCount = 0,
        ordersCount = 0,
        revenue = 0
    } = stats;

    // Dashboard card component
    const DashboardCard = ({ icon, title, value, bgColor }) => (
        <div className={`bg-white shadow-md rounded-lg p-6 flex items-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
            <div className={`p-4 rounded-full mr-4 ${bgColor} text-white`}>
                {icon}
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
                <p className="text-2xl font-bold text-[#BB8506]">{value}</p>
            </div>
        </div>
    );

    // Welcome message based on time of day
    const getWelcomeMessage = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-[#BB8506]"></span>
            </div>
        );
    }

    return (
        <div className="w-11/12 lg:w-4/5 mx-auto px-4 mb-10 min-h-screen flex flex-col justify-center">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#BB8506] to-[#D1A054] text-white p-6 rounded-lg shadow-md mb-8">
                <div className="flex items-center">
                    {user?.photoURL ? (
                        <img 
                            src={user?.photoURL} 
                            alt="Admin Profile" 
                            className="w-16 h-16 rounded-full mr-4 border-4 border-white"
                        />
                    ) : (
                        <div className="w-16 h-16 bg-white/30 rounded-full mr-4 flex items-center justify-center">
                            <FaUsers className="text-3xl text-white" />
                        </div>
                    )}
                    <div>
                        <h1 className="text-3xl font-bold">
                            {getWelcomeMessage()}, {user?.displayName || "Admin"}!
                        </h1>
                        <p className="text-sm opacity-80">Dashboard Overview</p>
                    </div>
                </div>
            </div>

            {/* Dashboard Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard 
                    icon={<FaUsers className="text-3xl" />}
                    title="Total Users"
                    value={userCount}
                    bgColor="bg-blue-500"
                />
                <DashboardCard 
                    icon={<FaHamburger className="text-3xl" />}
                    title="Total Menu Items"
                    value={menuCount}
                    bgColor="bg-green-500"
                />
                <DashboardCard 
                    icon={<FaShoppingCart className="text-3xl" />}
                    title="Total Orders"
                    value={ordersCount}
                    bgColor="bg-purple-500"
                />
                <DashboardCard 
                    icon={<FaDollarSign className="text-3xl" />}
                    title="Total Revenue"
                    value={`$${revenue.toFixed(2)}`}
                    bgColor="bg-yellow-500"
                />
            </div>
        </div>
    );
};

export default AdminHome;