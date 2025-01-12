import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../../components/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Key);
const Payment = () => {
    return (
        <div>
            <SectionTitle heading="Payment" subHeading="---Don't Miss---" />

            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm  /> 
                </Elements>
            </div>
            
        </div>
    );
};

export default Payment;