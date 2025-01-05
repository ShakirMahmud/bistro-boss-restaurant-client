import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: cart, refetch, isLoading } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/carts?email=${user?.email}`);
            return response.data;
        },
        enabled: !!user?.email,
    })
    return [cart, refetch, isLoading];
};

export default useCart;