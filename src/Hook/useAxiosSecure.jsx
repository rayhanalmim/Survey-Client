import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://survey-sphere-server.vercel.app',
  });

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;