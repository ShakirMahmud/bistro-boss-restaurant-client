import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../../components/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51J0QJvKXWd0r4JYQnW8z6mZcP4f5K2jvM8XoOa7K4iZQX9bOyZgj2h6r7LxT9cQxu0fJYqoT9sG7K4Ct6E8LwMm0c0z2b");
const Payment = () => {
    return (
        <div>
            <SectionTitle heading="Payment" subHeading="---Don't Miss---" />

            <div>
                <Elements stripe={stripePromise}>
                    
                </Elements>
            </div>
            
        </div>
    );
};

export default Payment;