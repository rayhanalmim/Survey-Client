import Title from "../../../Component/template/Title";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useState } from "react";
import Chart from "react-google-charts";
import { IoHappyOutline } from "react-icons/io5";
import useAllUser from "../../../Hook/useAllUser";
import useAllPayment from "../../../Hook/useAllPayment";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import moment from "moment/moment";

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const [clickedButton, setClickedButton] = useState(null);

    const { data: survey, isLoading, refetch } = useQuery({
        queryKey: ['surve'],
        queryFn: async () => {
            const res = await axiosPublic.get('/survey')
            return res.data;
        }
    })

    const [users, userLoading] = useAllUser();
    const [payment, paymentLoading] = useAllPayment();

    if (paymentLoading) {
        return <div className="flex justify-center"><span className="loading loading-spinner loading-md"></span></div>
    }

    if (userLoading) {
        return <div className="flex justify-center"><span className="loading loading-spinner loading-md"></span></div>
    }
    

    if (isLoading) {
        return <div className="flex justify-center"><span className="loading loading-spinner loading-md"></span></div>;
    }

    const handleFeedback = (e) =>{
        if(clickedButton !== 'button2'){
            console.log(e.target.feedback.value)
            const report = e.target.feedback.value;
            const feedBack = {report}
            axiosSecure.put(`/unpublished?id=${clickedButton}`, feedBack)
            .then(res =>{
                console.log(res.data)
                Swal.fire({
                    title: "Unpublished!",
                    text: "Survey unpublished successfully.",
                    icon: "success"
                });
                refetch()
            })
            
        }
    }

    const handlePublish = (id) =>{
        console.log(id)
        axiosSecure.put(`/published?id=${id}`)
        .then(res =>{
            console.log(res.data)
            Swal.fire({
                title: "Published!",
                text: "Survey unpublished successfully.",
                icon: "success"
            });
            refetch()
        })
    }

    console.log(payment)
    const data = [
        ["Task", "20"],
        ["Total Post", survey.length],
        ["Total User", users.length],
        ["Premium Users", payment.length],
    ];

    const options = {
        legend: true,
        backgroundColor: 'transparent',
        is3D: true,
    };

    return (
        <div className="">
            <div className="pt-5">
                <Title title='Admin Home'></Title>
            </div>

            <div className="">

                <div className="flex flex-col lg:flex-row">
                    <div>
                        <Chart
                            chartType="PieChart"
                            data={data}
                            options={options}
                            width={"100%"}
                            height={"300px"}
                        />
                    </div>
                    <div className="flex justify-center px-5 text-center lg:text-left  items-center">
                        <div>
                        <p className="text-black tracking-widest font-medium text-xl">{moment().format("dddd, MMMM D, YYYY")}</p>
                            <h3 className="text-gray-700 font-semibold text-xl"><IoHappyOutline className="text-2xl mr-1 inline-block"></IoHappyOutline><span className=" text-red-500">Survey</span> Response Overview</h3>
                            <div className="flex items-center justify-center pt-2 pr-2">
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
                                Posted By
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total Participated
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Posted Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            survey.map((survey, idx) => <tr key={survey._id} className=" border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {survey.title}
                                </th>
                                <td className="px-6 py-4">
                                    {survey.surveyor}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center text-black">
                                        {survey.vote.yes + survey.vote.no}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {survey.timestamp.slice(0, 10)}
                                </td>
                                <td className="px-6 py-4">
                                    {
                                        survey.status === 'publish' && <button className="btn btn-sm text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm" onClick={() => document.getElementById(`my_modal_${idx}`).showModal()}>Unpublish</button> 
                                    }
                                    
                                    {
                                        survey.status === 'unpublish' && <div><h3 className="font-semibold text-red-600">Unpublished</h3></div>
                                    }
                                    {
                                        survey.status === 'pending' && <button className="btn btn-sm text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 tracking-widest text-center" onClick={() => handlePublish(survey._id)}>Publish</button> 
                                    }

                                    {/* -----------------------------modal------------------------------- */}
                                    <dialog id={`my_modal_${idx}`} className="modal">
                                        <div className="modal-box">

                                        <h3 className="font-bold text-lg text-left pb-3">Give a feedback to the user:</h3>
                                        

                                            <div className="">
                                                <form onSubmit={handleFeedback} method="dialog">

                                                <textarea name='feedback' className="textarea textarea-bordered mb-2 w-full" placeholder="Feedback" ></textarea>
                                                    {/* if there is a button in form, it will close the modal */}
                                                    
                                                    <button onClick={() => setClickedButton(survey._id)} className="btn text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Confirm unpublished</button>

                                                    <button onClick={() => setClickedButton('button2')}  className="btn text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Cancel</button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminHome;