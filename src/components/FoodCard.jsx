import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from './../hooks/useAuth';

const FoodCard = ({ item }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const handleAddToCart = (food) => {
        if(user && user.email){
            // TODO: add to the database
        }
        else{
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
                    navigate('/login', {state: location.pathname});
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
                className="w-full h-52 object-cover"
            />

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-[#151515] text-sm flex-grow">{item.recipe}</p>

                {/* Button */}
                <div className="mt-auto">
                    <button
                    onClick={()=>handleAddToCart(item)}
                     className="w-full text-xl font-medium bg-[#E8E8E8] text-[#BB8506] py-2 px-4 rounded-lg border-b-4 border-[#BB8506] hover:bg-[#1F2937] transition duration-300">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
