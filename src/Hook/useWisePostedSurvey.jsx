import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../Authentication/AuthProvider';

const useWisePostedSurvey = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext)

    const { data: UserWiseSurvey = [], isPending, isFetching, refetch } = useQuery({
        queryKey: ['UserWiseSurvey', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/userwisesurver?email=${user.email}`)
            console.log(res.data)
            return res.data;
        }
    })
    return [UserWiseSurvey, isPending, isFetching, refetch];
};

export default useWisePostedSurvey;