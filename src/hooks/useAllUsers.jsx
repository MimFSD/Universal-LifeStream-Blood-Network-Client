import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllUsers = () => {
    const axiosSecure = useAxiosSecure();

    // tan stack query 
    const { refetch, data: allUsers=[]} = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/user_data');
            return res.data;
        }
    })
    return [allUsers, refetch]
};

export default useAllUsers;