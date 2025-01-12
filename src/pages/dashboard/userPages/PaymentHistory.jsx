import { useQuery } from "@tanstack/react-query";
import { FaMoneyBillWave, FaCalendarAlt, FaReceipt } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle";

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: payments = [], refetch, isLoading } = useQuery({
        queryKey: ['payment', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/payments/${user?.email}`);
            // Sort payments in descending order (latest first)
            return response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        },
        enabled: !!user?.email,
    });

    // Format date function
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-[#BB8506]"></span>
            </div>
        );
    }

    // Alternative approach if you want to modify the existing array
    // const sortedPayments = [...payments].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="w-11/12 lg:w-4/5 mx-auto px-4 mb-10">
            <SectionTitle
                heading="Payment History"
                subHeading="---At a Glance---"
            />

            {/* Summary Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
                    <FaMoneyBillWave className="text-4xl text-[#BB8506] mr-4" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Total Spent</h3>
                        <p className="text-2xl font-bold text-[#BB8506]">
                            ${payments.reduce((total, payment) => total + payment.price, 0).toFixed(2)}
                        </p>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
                    <FaReceipt className="text-4xl text-green-500 mr-4" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Total Transactions</h3>
                        <p className="text-2xl font-bold text-green-500">
                            {payments.length}
                        </p>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
                    <FaCalendarAlt className="text-4xl text-blue-500 mr-4" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Latest Transaction</h3>
                        <p className="text-sm text-blue-500">
                            {payments.length > 0
                                ? formatDate(payments[0].date)  // Now this will be the latest transaction
                                : 'No transactions'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Payment History Table */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-[#BB8506] text-white">
                        <tr>
                            <th className="p-4 text-left">Transaction ID</th>
                            <th className="p-4 text-left">Date</th>
                            <th className="p-4 text-left">Price</th>
                            <th className="p-4 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center p-6 text-gray-500">
                                    No payment history found
                                </td>
                            </tr>
                        ) : (
                            payments.map((payment, index) => (
                                <tr
                                    key={payment._id}
                                    className={`
                                        border-b last:border-b-0 
                                        ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                                        hover:bg-gray-100 transition duration-200
                                    `}
                                >
                                    <td className="p-4 text-sm font-medium text-gray-700">
                                        {payment.transactionId}
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">
                                        {formatDate(payment.date)}
                                    </td>
                                    <td className="p-4 text-lg font-semibold text-[#BB8506]">
                                        ${payment.price.toFixed(2)}
                                    </td>
                                    <td className="p-4">
                                        <span className={`
                                            px-3 py-1 rounded-full text-xs font-bold
                                            ${payment.status === 'success'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'}
                                        `}>
                                            {payment.status || 'Completed'}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Additional Information */}
            {payments.length > 0 && (
                <div className="mt-6 bg-blue-50 p-4 rounded-lg text-center">
                    <p className="text-blue-700">
                        💡 Tip: Keep track of your transaction history for reference
                    </p>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;