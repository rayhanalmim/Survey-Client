import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Authentication/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useUserRole = () => {
    const {user, looding} = useContext(AuthContext);

    const { data: userFromDb = [], isPending, isFetching, refetch } = useQuery({
                queryKey: ['user', user?.email],
                queryFn: async() => {
                    const res = await axios.get(`http://localhost:5000/role?user=${user.email}`)
                    return res.data;
                }
            })
    return [userFromDb, refetch];
};

export default useUserRole;