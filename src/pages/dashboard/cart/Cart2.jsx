import useCart from "../../../hooks/useCart";

const Cart2 = () => {
    const [cart] = useCart();
    return (
        <div>
            {cart.length}
        </div>
    );
};

export default Cart2;