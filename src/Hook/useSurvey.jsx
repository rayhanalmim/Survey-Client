// import { useContext } from "react";
// import { AuthContext } from "../Authentication/AuthProvider";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "./useAxiosPublic";


// const useSurvey = ({id}) => {
//     const {user} = useContext(AuthContext);
//     const axiosPublic = useAxiosPublic();

//     const { data: details, isPending, isFetching, refetch } = useQuery({
//         queryKey: ['surveys'],
//         queryFn: async () => {
//             const res = await axiosPublic.get(`details/${id}`)
//             return res.data;
//         }
//     })
//     return [details, isPending, isFetching, refetch];
// };

// export default useSurvey;