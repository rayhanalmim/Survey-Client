import { useQuery } from "@tanstack/react-query";
import Title from "../../../Component/template/Title";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const ManageSurvey = () => {

    const axiosSecure = useAxiosSecure();

    const {data: AllRes, isLoading } = useQuery({
        queryKey: ["allRespomse"],
        queryFn: async () =>{
            const res = await axiosSecure.get('/allserveyresponse')
            return res.data;
        }
    })

    if (isLoading) {
        return <div className="flex justify-center"><span className="loading loading-spinner loading-md"></span></div>
    }

    return (
        <div>
            <Title title='All Responses'></Title>
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
                            AllRes.map(survey => <tr key={survey._id} className=" border-b dark:bg-gray-800 dark:border-gray-700">
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
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg pb-2">test</h3>
                        <form>
                            <label className="flex gap-3 pb-1">
                                <div className="flex items-center">
                                    <input type="radio" className="radio" value="yes" />
                                </div>
                                <span className="label-text text-xl font-semibold">Yes</span>
                            </label>
                            <label className="flex gap-3">
                                <div className="flex items-center">
                                    <input type="radio" className="radio" value="no" />
                                </div>
                                <span className="label-text text-xl font-semibold">No</span>
                            </label>
                        </form>
                        <div className="flex justify-end">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Submit</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default ManageSurvey;