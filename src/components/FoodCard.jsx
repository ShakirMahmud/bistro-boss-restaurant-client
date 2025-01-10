import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from './../hooks/useAuth';
import useAxiosSecure from './../hooks/useAxiosSecure';
import useCart from "../hooks/useCart";

const FoodCard = ({ item }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();
    const handleAddToCart = () => {
        if (user && user.email) {
            
            const cartItem = {
                menuId: item._id,
                email: user.email,
                name: item.name,
                recipe: item.recipe,
                image: item.image,
                category: item.category,
                price: item.price,
                addedDate: Date.now(),
            };
            // Add to cart to the database
            axiosSecure.post('/carts', cartItem)
                .then(data => {
                    if (data.data.insertedId) {
                        Swal.fire({
                            title: 'Added to Cart',
                            text: 'The item has been added to your cart',
                            icon: 'success',
                            toast: true,
                            position: 'bottom-end',
                            timer: 3000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                        });
                        // Refetch the cart to update the cart count
                        refetch();
                    }
                })


        }
        else {
            Swal.fire({
                title: 'You are not logged in',
                text: 'Please login to add to cart',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login Now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Redirect to login page
                    navigate('/login', { state: location.pathname });
                }
            });
        }
    };
    return (
        <div
            className="relative bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300 flex flex-col min-h-[400px]"
        >
            {/* Price Tag */}
            <p className="absolute right-0 top-0 px-3 py-2 rounded-bl-lg bg-[#BB8506] text-white text-xl text-center">
                ${item.price}
            </p>

            {/* Image */}
            <img
                src={item.image}
                alt={item.name}
                className="w-full h-52 object-contain"
            />

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-[#151515] text-sm flex-grow">{item.recipe}</p>

                {/* Button */}
                <div className="mt-auto">
                    <button
                        onClick={handleAddToCart}
                        className="w-full text-xl font-medium bg-[#E8E8E8] text-[#BB8506] py-2 px-4 rounded-lg border-b-4 border-[#BB8506] hover:bg-[#1F2937] transition duration-300">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
