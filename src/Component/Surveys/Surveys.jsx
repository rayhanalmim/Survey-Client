import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import ShowSurvey from "./ShowSurvey";
import useAllServey from "../../Hook/useAllServey";

const Surveys = () => {
    const axiosPublic = useAxiosPublic();

    const [survey, isPending] = useAllServey();
    
    if (isPending) {
        return <div className="flex justify-center"><span className="loading loading-spinner loading-md"></span></div>;
    }
    console.log(survey);
    const filter = survey.filter(item => item.status === 'publish')
    console.log(filter)

    return (
        <div className="px-2 md:px-4  lg:px-7 bg-[#F5FF90]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-5">
                {
                    filter.map(item => <ShowSurvey key={item._id} surveyData={item}></ShowSurvey>)
                }
            </div>
        </div>
    );
};

export default Surveys;