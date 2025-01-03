import FoodCard from "../../components/FoodCard";

const OrderTab = ({ items }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {items.map((item) => <FoodCard key={item._id} item={item} />)}
        </div>
    );
};

export default OrderTab;