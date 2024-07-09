import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useMyRequests = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    // tan stack query 
    const { refetch, data: requests=[]} = useQuery({
        queryKey: ['requests'],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/my_donation_requests/${user?.email}`);
            return res.data;
        }
    })
    return [requests, refetch]
};

export default useMyRequests;