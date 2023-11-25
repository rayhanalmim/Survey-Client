import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import Statisties from "./Statisties";
import Comment from "./Comment";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { AuthContext } from "../../Authentication/AuthProvider";
import { Chart } from "react-google-charts";
import { IoHappyOutline } from "react-icons/io5";
import { FaArrowAltCircleRight } from "react-icons/fa";


const SurveyDetails = () => {
    const [response, setResponse] = useState(''); // State to store the selected response
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user, looding } = useContext(AuthContext);
    const { id } = useParams();


    const { data: details, isPending, isFetching, refetch } = useQuery({
        queryKey: ['surveyDetails'],
        queryFn: async () => {
            const res = await axiosPublic.get(`details/${id}`)
            return res.data;
        }
    })

   
    // useEffect(() => {
    //     if (details?.voted?.includes(user.email)) {
    //         setAlreadyVoted(true);
    //     }

    // }, [details.voted, user.email])

    // console.log(alreadyVoted)

    if (isPending || isFetching) {
        return <div className="flex justify-center"><span className="loading loading-spinner loading-md"></span></div>
    }
    if (looding) {
        return <div className="flex justify-center"><span className="loading loading-spinner loading-md"></span></div>
    }


    const { questionOne, title, description, voted, like, dislike, vote } = details;



    console.log(details)

    const isVoted = details.voted.filter(person => person === user.email)
    if (isVoted.length !== 0) {
        console.log('user already voted')
        console.log(isVoted)
    }

    const handleResponseChange = (event) => {

        setResponse(event.target.value);
    };

   

    const handleSubmit = () => {
        // Handle the submission logic, e.g., send the response to the server
        if (response === 'yes' || response === 'no') {

            console.log('response', response)
            axiosSecure.post(`/survey?email=${user.email}&res=${response}&surveyId=${id}`)
                .then(res => {
                    console.log(res.data)
                    refetch();
                })
        }
    };

    // ---------------------------piChart--------------------------


    const data = [
        ["Task", "20"],
        ["Yes", vote.yes],
        ["No", vote.no],
    ];

    const options = {
        legend: "none",
        backgroundColor: 'transparent',
    };

    return (
        <div className="">
            {
                isVoted.length !== 0 ? <div>

                    {/* -----------------------------voted_user----------------------------- */}
                    <div className="w-full p-4 text-center bg-[#F5FF90] shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{title}</h5>
                        <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">{description}</p>

                        <h3 className="text-gray-600 font-semibold text-xl"><span className="text-red-500">Question: </span>{questionOne}</h3>

                        <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                            
                            <div className="flex">
                                <div>
                                    <Chart
                                        chartType="PieChart"
                                        data={data}
                                        options={options}
                                        width={"100%"}
                                        height={"400px"}
                                    />
                                </div>
                                <div className="flex justify-center items-center"> 
                                   <div>
                                   <h3 className="text-gray-700 font-semibold text-xl"><span className="text-2xl text-red-500">Congratilation!</span> You successfully Participate This Survey <IoHappyOutline className="text-2xl mr-1 inline-block"></IoHappyOutline> <br /> Here Is The Survey Result <FaArrowAltCircleRight className="inline-block text-xl"></FaArrowAltCircleRight></h3>
                                    <div className="flex items-center justify-center gap-3 pt-6">
                                        <h3 className="text-lg font-medium text-[#0B0B0B">Yes</h3>
                                        <div className="h-2.5 w-16 mt-1 rounded-sm bg-[#5856d6]"></div>
                                        <h3 className="text-lg font-medium text-[#0B0B0B">No</h3>
                                        <div className="h-2.5 w-16 rounded-sm mt-1 bg-[#ff2d55]"></div>

                                    </div>
                                   </div>
                                </div>
                                {/* <div className="flex flex-col md:flex-row justify-center gap-4">
                                    <div className="flex justify-center gap-2">
                                        <div className="flex items-center">
                                            <h3 className="text-lg font-medium text-[#0B0B0B">Your Donation</h3>
                                        </div>
                                        <div className="flex justify-center items-center">
                                            <div className="h-2.5 w-16 mt-1 rounded-sm bg-[#5856d6]"></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center gap-2">
                                        <div className="flex items-center">
                                            <h3 className="text-lg font-medium text-[#0B0B0B">Total Donation</h3>
                                        </div>
                                        <div className="flex justify-center items-center">
                                            <div className="h-2.5 w-16 rounded-sm mt-1 bg-[#ff2d55]"></div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>

                        </div>
                        <div>
                            <div>
                                <ol className="relative border-s pt-5 border-gray-200 dark:border-gray-700">
                                    <Comment details={details}></Comment>
                                </ol>
                                {/* ---------------------------comment--------------------------- */}

                            </div>
                            <div>
                                {/* --------------------inputComment---------------------- */}
                                <form>
                                    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-lime-100 dark:bg-gray-700 dark:border-gray-600">
                                        <div className="px-4 py-2 rounded-t-lg dark:bg-gray-800">
                                            <label className="sr-only">Your comment</label>
                                            <textarea id="comment" rows="4" className="w-full px-0 text-sm text-gray-900 bg-lime-100 border-2 pl-2 pt-1 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
                                        </div>
                                        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                            <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                                Post comment
                                            </button>
                                            <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                                                <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
                                                        <path stroke="currentColor" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6" />
                                                    </svg>
                                                    <span className="sr-only">Attach file</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.</p>

                            </div>
                        </div>
                    </div>

                    {/* Open the modal using document.getElementById('ID').showModal() method */}

                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg pb-2">{questionOne}</h3>
                            <form>
                                <label className="flex gap-3 pb-1">
                                    <div className="flex items-center">
                                        <input type="radio" className="radio" value="yes" checked={response === 'yes'} onChange={handleResponseChange} />
                                    </div>
                                    <span className="label-text text-xl font-semibold">Yes</span>
                                </label>
                                <label className="flex gap-3">
                                    <div className="flex items-center">
                                        <input type="radio" className="radio" value="no" checked={response === 'no'} onChange={handleResponseChange} />
                                    </div>
                                    <span className="label-text text-xl font-semibold">No</span>
                                </label>
                            </form>
                            <div className="flex justify-end">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button onClick={handleSubmit} className="btn text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Submit</button>
                                </form>
                            </div>
                        </div>
                    </dialog>

                </div> : <div>
                    {/* ------------------------------not_voted_user----------------------- */}
                    <div className="w-full p-4 text-center bg-[#F5FF90] shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{title}</h5>
                        <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">{description}</p>
                        <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">

                            <Statisties details={details}></Statisties>

                            <button className="btn text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => document.getElementById('my_modal_1').showModal()}>Participate Now</button>
                        </div>
                        <div>
                            <div>
                                <ol className="relative border-s pt-5 border-gray-200 dark:border-gray-700">
                                    <Comment details={details}></Comment>
                                </ol>
                                {/* ---------------------------comment--------------------------- */}

                            </div>
                            <div>
                                {/* --------------------inputComment---------------------- */}
                                <form>
                                    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-lime-100 dark:bg-gray-700 dark:border-gray-600">
                                        <div className="px-4 py-2 rounded-t-lg dark:bg-gray-800">
                                            <label className="sr-only">Your comment</label>
                                            <textarea id="comment" rows="4" className="w-full px-0 text-sm text-gray-900 bg-lime-100 border-2 pl-2 pt-1 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
                                        </div>
                                        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                            <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                                Post comment
                                            </button>
                                            <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                                                <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
                                                        <path stroke="currentColor" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6" />
                                                    </svg>
                                                    <span className="sr-only">Attach file</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.</p>

                            </div>
                        </div>
                    </div>

                    {/* Open the modal using document.getElementById('ID').showModal() method */}

                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg pb-2">{questionOne}</h3>
                            <form>
                                <label className="flex gap-3 pb-1">
                                    <div className="flex items-center">
                                        <input type="radio" className="radio" value="yes" checked={response === 'yes'} onChange={handleResponseChange} />
                                    </div>
                                    <span className="label-text text-xl font-semibold">Yes</span>
                                </label>
                                <label className="flex gap-3">
                                    <div className="flex items-center">
                                        <input type="radio" className="radio" value="no" checked={response === 'no'} onChange={handleResponseChange} />
                                    </div>
                                    <span className="label-text text-xl font-semibold">No</span>
                                </label>
                            </form>
                            <div className="flex justify-end">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button onClick={handleSubmit} className="btn text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Submit</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            }


        </div>
    );
};

export default SurveyDetails;