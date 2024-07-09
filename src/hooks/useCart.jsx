import {useQuery} from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
    const axiosSecure = useAxiosSecure();

    // tan stack query 
    const { refetch, data: cart=[]} = useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            const res = await axiosSecure.get('/store_donor_info');
            return res.data;
        }
    })
    return [cart, refetch]
};

export default useCart;