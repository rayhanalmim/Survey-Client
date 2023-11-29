import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useAllServey = () => {
    const axiosPublic = useAxiosPublic();

    const { data: survey, isPending, isLoading, refetch } = useQuery({
        queryKey: ['surveyData'],
        queryFn: async () => {
            const res = await axiosPublic.get('/survey')
            return res.data;
        }
    })
    return [survey, isPending, isLoading, refetch];
};

export default useAllServey;