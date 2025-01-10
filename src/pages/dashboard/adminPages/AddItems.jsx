import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddItems = () => {
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    // Image hosting API (Replace with your actual API)
    // const IMAGE_HOSTING_KEY = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    // const IMAGE_HOSTING_API = `https://api.imgbb.com/1/upload?key=${IMAGE_HOSTING_KEY}`;

    // const onSubmit = async (data) => {
    //     setLoading(true);
    //     try {
    //         // Image upload
    //         const imageFile = data.image[0];
    //         const formData = new FormData();
    //         formData.append('image', imageFile);

    //         const imageResponse = await fetch(IMAGE_HOSTING_API, {
    //             method: 'POST',
    //             body: formData
    //         });
    //         const imageResult = await imageResponse.json();

    //         if (imageResult.success) {
    //             // Prepare menu item
    //             const menuItem = {
    //                 name: data.name,
    //                 category: data.category,
    //                 price: parseFloat(data.price),
    //                 recipe: data.recipe,
    //                 image: imageResult.data.display_url
    //             };

    //             // Send to server
    //             const response = await axiosSecure.post('/menu', menuItem);

    //             if (response.data.insertedId) {
    //                 // Success notification
    //                 Swal.fire({
    //                     position: "top-end",
    //                     icon: "success",
    //                     title: `${data.name} added to menu`,
    //                     showConfirmButton: false,
    //                     timer: 1500
    //                 });
    //                 reset();
    //             }
    //         }
    //     } catch (error) {
    //         console.error("Error adding item:", error);
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Oops...',
    //             text: 'Something went wrong!'
    //         });
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <div className="w-4/5 mx-auto px-4 mb-10">
            <SectionTitle
                heading="Add an Item"
                subHeading="---What's New---"
            />

            <div className="bg-white shadow-md rounded-lg p-8">
                <form className="space-y-6">
                    {/* Recipe Name */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">
                            Recipe Name*
                        </label>
                        <input
                            type="text"
                            placeholder="Recipe Name"
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
                                <option value="">Select Category</option>
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
                                placeholder="Price"
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
                            placeholder="Recipe Description"
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
                            Recipe Image*
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
                                Adding Item...
                            </>
                        ) : (
                            <>
                                <FaUtensils />
                                Add Item
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Additional Information Section */}
            <div className="mt-8 bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Adding a New Menu Item
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Ensure all fields are filled accurately</li>
                    <li>Upload a high-quality image of the dish</li>
                    <li>Provide a detailed and appetizing description</li>
                    <li>Set a competitive price for the item</li>
                    <li>Select the appropriate category</li>
                </ul>
            </div>

            {/* Preview Section (Optional) */}
            {/* {watch("image") && watch("image").length > 0 && (
                <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Image Preview
                    </h3>
                    <div className="flex justify-center">
                        <img
                            src={URL.createObjectURL(watch("image")[0])}
                            alt="Preview"
                            className="max-w-xs max-h-64 object-cover rounded-lg shadow-md"
                        />
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default AddItems;