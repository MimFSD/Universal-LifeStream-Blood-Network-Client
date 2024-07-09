import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAllDonaRequest = () => {
    const axiosSecure = useAxiosSecure();

    // tan stack query 
    const { refetch, data: allRequests=[]} = useQuery({
        queryKey: ['allRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all_donation_requests');
            return res.data;
        }
    })
    return [allRequests, refetch]
};

export default useAllDonaRequest;