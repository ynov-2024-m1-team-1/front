import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_ENDPOINT}`,
    timeout: 5000,
    headers: {
        "Content-type": "application/json",
    },
});

export default axiosInstance;