import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://survey-sphere-server.vercel.app',
  });
  // 

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;