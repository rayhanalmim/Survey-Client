import { useContext } from "react";
import Title from "../../../Component/template/Title";
import { AuthContext } from "../../../Authentication/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const SurveysResponse = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const {data: surveyResponse = []} = useQuery({
        queryKey: ['response', user.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/surveyres?email=${user.email}`)
            console.log(res.data)
            return res.data;
        }
    })

    return (
        <div>
            <Title title={'Survey Response'}></Title>
        </div>
    );
};

export default SurveysResponse;