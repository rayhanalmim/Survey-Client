import SubHeading from "../../../Component/template/SubHeading";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAllUser from "../../../Hook/useAllUser";

const ManageUser = () => {
    const axiosSecure = useAxiosSecure();

    const [users, userLoading, userFetching] = useAllUser();

    if (userLoading) {
        return <div className="flex justify-center"><span className="loading loading-spinner loading-md"></span></div>
    }

    const handleRole = (name, id) => {

        Swal.fire({
            title: "Are you sure?",
            text: `Add ${name} as a surveyor`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, i'm confirm!"
        }).then((result) => {
            if (result.isConfirmed) {
               
                axiosSecure.post(`/makesurveyor?id=${id}`)
                    .then(res => {
                        console.log(res.data)
                        Swal.fire({
                            title: "Added!",
                            text: `Added ${name} as a surveyor`,
                            icon: "success"
                        });
                        userFetching()
                    })
            }
        });
    }

    return (
        <div>
            <SubHeading heading='All Active Users'></SubHeading>
            <div className="relative overflow-x-auto w-11/12 mx-auto mt-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs uppercase bg-gray-800 text-white dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                User Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                User Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Current Role
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Make Surveyor
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => <tr key={user._id} className=" border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.name}
                                </th>
                                <td className="px-6 py-4">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 text-black font-semibold">
                                    {user.role}
                                </td>
                                <td className="px-6 py-4">
                                    {
                                        user.role === 'user' || user.role === 'proUser' ? <button onClick={()=>handleRole(user.name, user._id)} className="btn btn-sm bg-lime-200"><FaEdit className="inline-block pb-1 text-lg"></FaEdit>Make Surveyor</button> : ""
                                    }
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

export default ManageUser;