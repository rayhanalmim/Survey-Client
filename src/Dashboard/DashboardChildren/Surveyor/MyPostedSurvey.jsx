import { useContext } from 'react';
import Title from '../../../Component/template/Title';
import useWisePostedSurvey from '../../../Hook/useWisePostedSurvey';
import { AuthContext } from '../../../Authentication/AuthProvider';
import { RiFileEditFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { Link } from 'react-router-dom';

const MyPostedSurvey = () => {
    const { looding } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();
    if (looding) {
        return <div className="flex justify-center"><span className="loading loading-spinner loading-md"></span></div>;
    }
    const [UserWiseSurvey, isPending, isFetching, refetch] = useWisePostedSurvey();
    console.log(UserWiseSurvey)

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/deleteSurvey?id=${id}`)
                    .then(res => {
                        console.log(res.data)
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        refetch()
                    })
            }
        });

    }

    return (
        <div>
            <Title title={'Manage Survey'}></Title>


            <div className="relative overflow-x-auto w-11/12 mx-auto mt-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs uppercase bg-gray-800 text-white dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Survey Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Users Feedback
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Update
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            UserWiseSurvey.map((survey, idxx) => <tr key={survey._id} className=" border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {survey.title}
                                </th>
                                <td className="px-6 py-4">
                                    <button className="btn btn-sm text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm" onClick={() => document.getElementById(`my_modal_${idxx}`).showModal()}>Feedback</button>

                                    {/* -----------------------------modal------------------------------- */}
                                    <dialog id={`my_modal_${idxx}`} className="modal">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg pb-2 text-black">User Feedback: </h3>
                                            {
                                                survey.feedback.length ? <ol>
                                                    {
                                                        survey.feedback.map((item, idx) => <li key={idx}><span className='font-semibold text-black'>Feedback by <span className='text-rose-500 font-bold'>{item.userName}</span></span>: <span>{item.report}</span></li>)
                                                    }
                                                </ol> : <h3>No feedback yet</h3>
                                            }

                                            <h3 className="font-bold mt-2 text-lg text-black pb-2">Admin Feedback: </h3>

                                            <div className="flex justify-end">
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="btn text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">close</button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                </td>
                                <td className="px-6 py-4">
                                    <Link to={`/dashboard/mypostedsurvey/${survey._id}`}><button className=''><RiFileEditFill className='text-2xl text-black'></RiFileEditFill></button></Link>
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => handleDelete(survey._id)} className=''><MdDeleteForever className='text-3xl text-black'></MdDeleteForever></button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>


            </div>

        </div>
    );
};

export default MyPostedSurvey;