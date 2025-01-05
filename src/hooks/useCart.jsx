import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
    const axiosSecure = useAxiosSecure();
   const {data: cart } = useQuery({
      queryKey: ['carts'],
        queryFn: async () => {
             const response = await axiosSecure.get('/carts');
             return response.data;
        },
   })
   return [cart];
};

export default useCart;