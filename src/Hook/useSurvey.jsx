import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useSurvey = ({id}) => {
    const axiosPublic = useAxiosPublic();
    console.log(id)

    const { data: details = [], isPending, isFetching, refetch, isLoading } = useQuery({
        queryKey: ['surveys', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`details/${id}`)
            return res.data;
        }
    })
    return [details, isPending, isFetching, refetch];
};

export default useSurvey;