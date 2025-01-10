import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SectionTitle from "../../../components/SectionTitle";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";

const UpdateItem = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const { data: item, isLoading } = useQuery({
        queryKey: ['item', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/menu/${id}`);
            return res.data;
        }
    })
    console.log(item);

    const onSubmit = (data) => {
        // setLoading(true);
        console.log(data);

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
                            {...register("image", {
                                required: "Image is required"
                            })}
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