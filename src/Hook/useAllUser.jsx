import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAllUser = () => {

    const axiosSecure = useAxiosSecure();

    const { data: users = [], isLoading: userLoading, refetch: userFetching } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get('/allActiveUser')
            return res.data;
        }
    })
    return [users, userLoading, userFetching];
};

export default useAllUser;