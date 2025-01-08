import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isAdmin , refetch, isLoading} = useQuery({
        queryKey: ['admin', user?.email],
        queryFn: async () => {
            const res = await axiosSecure(`/users/admin/${user?.email}`);
            console.log('admin', res.data);
            return res.data?.isAdmin;
        }
    })
    return [isAdmin, refetch, isLoading];
};

export default useAdmin;