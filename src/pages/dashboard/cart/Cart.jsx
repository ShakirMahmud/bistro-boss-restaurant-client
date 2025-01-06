import { useState, useEffect } from "react";
import { FaTrashAlt, FaSpinner } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";

const Cart = () => {
    const axiosSecure = useAxiosSecure();
    const [cart, refetch, isLoading] = useCart();
    const [total, setTotal] = useState(0);

    // Use useEffect to calculate total when cart changes
    useEffect(() => {
        if (cart && cart.length > 0) {
            const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
            setTotal(totalPrice);
        } else {
            setTotal(0);
        }
    }, [cart]);

    const handleDelete = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this item!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(response => {
                        refetch();
                        if (response.data.deletedCount > 0) {
                            Swal.fire({
                                title: 'Deleted!',
                                text: 'Your item has been deleted.',
                                icon: 'success',
                                toast: true,
                                position: 'bottom-end',
                                timer: 3000,
                                timerProgressBar: true,
                                showConfirmButton: false,
                            });
                        }
                    })
                    .catch(error => {
                        console.error("Error deleting cart item:", error);
                    });
            }
        })



    };

    // Loading State
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <FaSpinner className="animate-spin text-4xl text-[#BB8506]" />
            </div>
        );
    }


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
                        Total Items: {cart.length}
                    </h2>
                    <h2 className="text-2xl font-bold text-[#BB8506]">
                        Total Price: ${total.toFixed(2)}
                    </h2>
                </div>
                <button
                    disabled={cart.length === 0}
                    className="w-full bg-[#BB8506] text-white py-2 rounded-lg 
                    hover:bg-[#9c6e05] transition duration-300
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Pay Now
                </button>
            </div>

            {/* Cart Items */}
            {cart.length > 0 ? (
                <div className="grid gap-6">
                    {cart.map((item) => (
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
            ) : (
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