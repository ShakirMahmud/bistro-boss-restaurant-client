import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
})
const useAxiosSecure = () => {
    axiosSecure.interceptors.request.use(
        config => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );
    axiosSecure.interceptors.response.use(
        response => response,
        error => {
            return Promise.reject(error);
        }
    );
    return axiosSecure;
};

export default useAxiosSecure;