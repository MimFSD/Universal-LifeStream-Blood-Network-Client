import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useContentBlogs = () => {
    const axiosSecure = useAxiosSecure();

    // tan stack query 
    const { refetch, data: contents=[]} = useQuery({
        queryKey: ['contents'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all_blogs');
            return res.data;
        }
    })
    return [contents, refetch]
};

export default useContentBlogs;