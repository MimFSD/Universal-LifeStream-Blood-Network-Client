
// export const axiosPublic = axios.create({
//     baseURL: 'http://localhost:5000'
// })

import axios from "axios";

export const axiosPublic = axios.create({
    baseURL: 'https://blood-donation-server-one-nu.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;