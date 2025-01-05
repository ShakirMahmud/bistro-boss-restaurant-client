import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle";

const Cart = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (user && user.email) {
            axiosSecure.get(`/carts?email=${user.email}`)
                .then(data => {
                    setCartItems(data.data);
                    calculateTotal(data.data);
                })
        }
    }, [user, axiosSecure]);

    const calculateTotal = (items) => {
        const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
        setTotal(totalPrice);
    };

    const handleDelete = (id) => {
        // Implement delete logic
        axiosSecure.delete(`/carts/${id}`)
            .then(response => {
                const updatedCart = cartItems.filter(item => item._id !== id);
                setCartItems(updatedCart);
                calculateTotal(updatedCart);
            });
    };

    return (
        <div className="w-4/5 mx-auto px-4 mb-10">
            <SectionTitle 
                heading="Wanna Add More?" 
                subHeading="---My Cart---" 
            />

            {/* Cart Summary */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Total Items: {cartItems.length}
                    </h2>
                    <h2 className="text-2xl font-bold text-[#BB8506]">
                        Total Price: ${total.toFixed(2)}
                    </h2>
                </div>
                <button 
                    className="w-full bg-[#BB8506] text-white py-2 rounded-lg 
                    hover:bg-[#9c6e05] transition duration-300"
                >
                    Pay Now
                </button>
            </div>

            {/* Cart Items */}
            <div className="grid gap-6">
                {cartItems.map((item) => (
                    <div 
                        key={item._id} 
                        className="flex items-center bg-white shadow-md rounded-lg p-4 
                        hover:shadow-lg transition duration-300"
                    >
                        {/* Image */}
                        <div className="w-24 h-24 mr-6 flex-shrink-0">
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>

                        {/* Details */}
                        <div className="flex-grow">
                            <h3 className="text-xl font-semibold text-gray-800">
                                {item.name}
                            </h3>
                            <p className="text-gray-600 line-clamp-2">
                                {item.recipe}
                            </p>
                            <p className="text-[#BB8506] font-bold mt-2">
                                ${item.price.toFixed(2)}
                            </p>
                        </div>

                        {/* Delete Button */}
                        <button 
                            onClick={() => handleDelete(item._id)}
                            className="ml-6 text-red-500 hover:text-red-700 
                            transition duration-300"
                        >
                            <FaTrashAlt className="w-6 h-6" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Empty Cart State */}
            {cartItems.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                    <p className="text-2xl text-gray-500">
                        Your cart is empty
                    </p>
                    <button 
                        className="mt-4 bg-[#BB8506] text-white px-6 py-2 rounded-lg
                        hover:bg-[#9c6e05] transition duration-300"
                    >
                        Add Some Dishes
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;