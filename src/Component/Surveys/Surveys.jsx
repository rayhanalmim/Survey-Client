import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import ShowSurvey from "./ShowSurvey";

const Surveys = () => {
    const axiosPublic = useAxiosPublic();

    const { data: survey, isPending } = useQuery({
        queryKey: ['surveyData'],
        queryFn: async () => {
            const res = await axiosPublic.get('/survey')
            return res.data;
        }
    })
    if (isPending) {
        return <div className="flex justify-center"><span className="loading loading-spinner loading-md"></span></div>;
    }
    console.log(survey);

    return (
        <div className="px-7 bg-[#F5FF90]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-5">
                {
                    survey.map(item => <ShowSurvey key={item._id} surveyData={item}></ShowSurvey>)
                }
            </div>
        </div>
    );
};

export default Surveys;