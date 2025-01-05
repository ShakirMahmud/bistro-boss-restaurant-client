const FoodCard = ({ item }) => {
    const handleAddToCart = (food) => {
        console.log('Add to Cart', food);
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
