import { useEffect } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useMenu = () => {
    const axiosPublic = useAxiosPublic();
    
        useEffect(() => {
            window.scrollTo(0, 0);
        }, []);

        const { data: menu = [], isLoading: loading, refetch } = useQuery({
            queryKey: ['menu'],
            queryFn: async () => {
                const res = await axiosPublic.get('/menu');
                return res.data;
            }
        });
    return [menu, refetch, loading];
}

export default useMenu