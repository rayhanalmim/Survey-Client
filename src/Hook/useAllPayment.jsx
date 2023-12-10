import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllPayment = () => {
    const axiosSecure = useAxiosSecure();

    const { data: payment = [], isLoading: paymentLoading, refetch: paymentRetching, isPending } = useQuery({
        queryKey: ["payment"],
        queryFn: async () => {
            const res = await axiosSecure.get('/paymentData')
            return res.data;
        }
    })
    return [payment, paymentLoading, paymentRetching, isPending];
};

export default useAllPayment;