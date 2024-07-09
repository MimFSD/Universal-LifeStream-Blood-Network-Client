import axios from "axios";

export const axiosSecure = axios.create({
    baseURL: 'https://blood-donation-server-one-nu.vercel.app'
}) 

const useAxiosSecure = () => {
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token');
        console.log('request stopped by interceptors', token);
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function(error) {
        // Do something with request error
        return Promise.reject(error);
    })


    // intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function(response) {
        return response;
    }, function(error) {
        console.log('status error in the interceptor', error);
        return Promise.reject(error);
    })

    return axiosSecure;
};

export default useAxiosSecure;