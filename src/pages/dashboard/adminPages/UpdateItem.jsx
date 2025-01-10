import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SectionTitle from "../../../components/SectionTitle";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateItem = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const { data: item, isLoading, refetch } = useQuery({
        queryKey: ['item', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/menu/${id}`);
            return res.data;
        }
    });

    const IMAGE_HOSTING_KEY = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const IMAGE_HOSTING_API = `https://api.imgbb.com/1/upload?key=${IMAGE_HOSTING_KEY}`;

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            // Prepare menuItem object with existing item details
            let menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: item.image // Default to existing image
            };
    
            // Check if a new image is uploaded
            if (data.image && data.image.length > 0) {
                // Image upload
                const imageFile = { image: data.image[0] };
                const imageResponse = await axiosPublic.post(IMAGE_HOSTING_API, imageFile, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                const imageResult = imageResponse.data;
                console.log(imageResult);
    
                // If image upload is successful, update the image URL
                if (imageResult.success) {
                    menuItem.image = imageResult.data.display_url;
                }
            }
    
            // Update menu item in database
            const response = await axiosSecure.patch(`/menu/${id}`, menuItem);
    
            if (response.data.modifiedCount > 0) {
                // Success notification
                Swal.fire({
                    position: "top-end",
                    toast: true,
                    icon: "success",
                    title: `${data.name} updated successfully!`,
                    showConfirmButton: false,
                    timer: 1500
                });
                reset();
            }
        } catch (error) {
            console.error("Error updating item:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            });
        } finally {
            setLoading(false);
            navigate('/dashboard/manageItems');
            refetch();
        }
    }

    if (isLoading) {
        return <progress className="progress w-56"></progress>;
    }
    return (
        <div className="w-11/12 lg:w-4/5 mx-auto px-4 mb-10">
            <SectionTitle
                heading="Update Item"

            />

            <div className="bg-white shadow-md rounded-lg p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Recipe Name */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">
                            Recipe Name*
                        </label>
                        <input
                            type="text"
                            defaultValue={item.name}
                            className="w-full px-4 py-2 border rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-[#BB8506]"
                            {...register("name", {
                                required: "Recipe name is required",
                                maxLength: {
                                    value: 120,
                                    message: "Name too long"
                                }
                            })}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Category & Price Row */}
                    <div className="flex space-x-6">
                        {/* Category */}
                        <div className="flex-1">
                            <label className="block text-gray-700 font-bold mb-2">
                                Category*
                            </label>
                            <select
                                className="w-full px-4 py-2 border rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-[#BB8506]"
                                {...register("category", {
                                    required: "Category is required"
                                })}
                            >
                                <option value={item.category}>{item.category}</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                            {errors.category && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.category.message}
                                </p>
                            )}
                        </div>

                        {/* Price */}
                        <div className="flex-1">
                            <label className="block text-gray-700 font-bold mb-2">
                                Price*
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                defaultValue={item.price}
                                className="w-full px-4 py-2 border rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-[#BB8506]"
                                {...register("price", {
                                    required: "Price is required",
                                    min: {
                                        value: 0,
                                        message: "Price must be positive"
                                    }
                                })}
                            />
                            {errors.price && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.price.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Recipe Details */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">
                            Recipe Details*
                        </label>
                        <textarea
                            defaultValue={item.recipe}
                            rows={4}
                            className="w-full px-4 py-2 border rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-[#BB8506]"
                            {...register("recipe", {
                                required: "Recipe details are required",
                                maxLength: {
                                    value: 500,
                                    message: "Description too long"
                                }
                            })}
                        />
                        {errors.recipe && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.recipe.message}
                            </p>
                        )}
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">
                            Update Recipe Image*
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            className="file-input file-input-bordered file-input-warning w-full"
                            {...register("image")}
                        />
                        {errors.image && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.image.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-auto bg-[#BB8506] text-white px-4 py-3 rounded-lg hover:bg-[#9c6e05] transition duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <span className="loading loading-spinner"></span>
                                Updating Item...
                            </>
                        ) : (
                            <>
                                <FaUtensils />
                                Update Item
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;