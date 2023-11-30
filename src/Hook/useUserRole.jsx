import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Authentication/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useUserRole = () => {
    const {user, looding} = useContext(AuthContext);

    const { data: userFromDb = [], isPending, isFetching, refetch: userRefetch } = useQuery({
                queryKey: ['user', user?.email],
                queryFn: async() => {
                    const res = await axios.get(`https://survey-sphere-server.vercel.app/role?user=${user.email}`)
                    return res.data;
                }
            })
    return [userFromDb, userRefetch];
};

export default useUserRole;