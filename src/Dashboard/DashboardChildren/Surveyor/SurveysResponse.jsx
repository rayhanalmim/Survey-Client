import { useContext } from "react";
import Title from "../../../Component/template/Title";
import { AuthContext } from "../../../Authentication/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { IoHappyOutline } from "react-icons/io5";
import Chart from "react-google-charts";
import useWisePostedSurvey from "../../../Hook/useWisePostedSurvey";

const SurveysResponse = () => {
    const { user, looding } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    

    if (looding) {
        return <div className="flex justify-center"><span className="loading loading-spinner loading-md"></span></div>;
    }

    const [UserWiseSurvey, isPending, isFetching, refetch] = useWisePostedSurvey();

    const { data: surveyResponse = [] } = useQuery({
        queryKey: ['response', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/surveyres?email=${user.email}`, )
            console.log(res.data)
            return res.data;
        }
    })

    const options = {
        legend: true,
        backgroundColor: 'transparent',
        is3D: true,
    };


    return (
        <div>
            <Title title={'Survey Response'}></Title>

            <div className="">

                <div className="flex flex-col lg:flex-row">
                    <div>
                        <Chart
                            chartType="PieChart"
                            data={[
                                ['Category', 'Value'],
                                ...UserWiseSurvey.map(survey=> [survey.title, survey.vote.yes]),
                              ]}
                            options={options}
                            width={"100%"}
                            height={"300px"}
                        />
                    </div>
                    <div className="flex justify-center px-5 lg:px-0 items-center">
                        <div>
                            <h3 className="text-gray-700 font-semibold text-xl"><IoHappyOutline className="text-2xl mr-1 inline-block"></IoHappyOutline><span className=" text-red-500">Survey</span> Response Overview</h3>
                            <div className="flex items-center justify-center pt-3 pr-2">
                                <h3>Welcome to your personalized survey response chart. Here, we have translated your feedback into a visual format for a clearer understanding. Delve into the details and discover the visual story of your survey responses.</h3>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="relative overflow-x-auto w-11/12 mx-auto mt-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs uppercase bg-gray-800 text-white dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Survey Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Voted
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Time
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            surveyResponse.map(survey => <tr key={survey._id} className=" border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {survey.votedOn}
                                </th>
                                <td className="px-6 py-4">
                                    {survey.name}
                                </td>
                                <td className="px-6 py-4">
                                    {survey.email}
                                </td>
                                <td className="px-6 py-4">
                                    {survey.vote}
                                </td>
                                <td className="px-6 py-4">
                                    {survey.time.slice(0, 10)}
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SurveysResponse;