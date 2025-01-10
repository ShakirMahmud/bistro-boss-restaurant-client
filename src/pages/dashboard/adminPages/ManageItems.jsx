import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../Loading";

const ManageItems = () => {
    const [menu, loading, refetch] = useMenu();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");

    // Filter menu items based on search term
    const filteredMenu = menu.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle Item Deletion
    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to delete ${item.name}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axiosSecure.delete(`/menu/${item._id}`);
                    
                    if (response.data.deletedCount > 0) {
                        // Refetch the menu to update the list
                        refetch();
                        
                        Swal.fire({
                            title: "Deleted!",
                            text: `${item.name} has been deleted.`,
                            icon: "success"
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete the item.",
                        icon: "error"
                    });
                }
            }
        });
    };

    if(loading){
        return <Loading/>;
    }

    return (
        <div className="w-11/12 lg:w-4/5 mx-auto px-4 mb-10">
            <SectionTitle
                heading="Manage Items"
                subHeading="---Hurry Up!---"
            />

            {/* Search and Filter */}
            <div className="mb-6 flex flex-col lg:flex-row gap-4 lg:gap-0 justify-between items-center">
                <div className="relative w-full max-w-md">
                    <input 
                        type="text" 
                        placeholder="Search menu items..."
                        className="w-full px-4 py-2 border rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-[#BB8506]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="absolute right-3 top-3 text-gray-400">
                        🔍
                    </span>
                </div>
                <div>
                    <button 
                        onClick={() => navigate('/dashboard/addItems')}
                        className="bg-[#BB8506] text-white px-4 py-2 rounded-lg 
                        hover:bg-[#9c6e05] transition duration-300 
                        flex items-center gap-2"
                    >
                        <FaEdit /> Add New Item
                    </button>
                </div>
            </div>

            {/* Menu Items Grid */}
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredMenu.map(item => (
                    <div 
                        key={item._id} 
                        className="bg-white shadow-md rounded-lg p-4 
                        flex items-center space-x-4 
                        hover:shadow-lg transition duration-300"
                    >
                        {/* Item Image */}
                        <div className="flex-shrink-0">
                            <img 
                                className=" w-[60px] h-[60px] lg:w-[118px] lg:h-[104px] rounded-tr-full rounded-br-full rounded-bl-full object-cover" 
                                src={item.image} 
                                alt={item.name} 
                            />
                        </div>

                        {/* Item Details */}
                        <div className="flex-grow">
                            <h3 className="uppercase text-[#151515] text-xl font-bold">
                                {item.name}
                            </h3>
                            <p className="text-[#737373] mt-2 line-clamp-2">
                                {item.recipe}
                            </p>
                            <p className="text-xl text-[#BB8506] font-semibold mt-2">
                                ${item.price.toFixed(2)}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col space-y-2">
                            <button 
                                onClick={() => navigate(`/dashboard/updateItem/${item._id}`)}
                                className="bg-green-500 text-white p-2 rounded-lg 
                                hover:bg-green-600 transition duration-300 
                                flex items-center justify-center"
                            >
                                <FaEdit />
                            </button>
                            <button 
                                onClick={() => handleDelete(item)}
                                className="bg-red-500 text-white p-2 rounded-lg 
                                hover:bg-red-600 transition duration-300
                                flex items-center justify-center"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredMenu.length === 0 && (
                <div className="text-center py-12 bg-gray-100 rounded-lg">
                    <p className="text-2xl text-gray-500">
                        No menu items found
                    </p>
                    <button 
                        onClick={() => setSearchTerm('')}
                        className="mt-4 bg-[#BB8506] text-white px-6 py-2 rounded-lg"
                    >
                        Reset Search
                    </button>
                </div>
            )}

            {/* Summary */}
            <div className="mt-6 text-center text-gray-600">
                Total Items: {filteredMenu.length}
            </div>
        </div>
    );
};

export default ManageItems;