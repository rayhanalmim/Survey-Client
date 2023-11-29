import { useQuery } from "@tanstack/react-query";
import Title from "../../../Component/template/Title";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAllPayment from "../../../Hook/useAllPayment";

const ProMember = () => {
    const axiosSecure = useAxiosSecure();

    const [payment, paymentLoading, paymentRetching, isPending] = useAllPayment();

    if (paymentLoading) {
        return <div className="flex justify-center"><span className="loading loading-spinner loading-md"></span></div>
    }

    return (
        <div>
             <div className="pt-5">
                <Title title='Premium Member'></Title>

                <div className="relative overflow-x-auto w-11/12 mx-auto mt-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs uppercase bg-gray-800 text-white dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                payment ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amout
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Payment Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payment.map(pay => <tr key={pay._id} className=" border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {pay.PaymentId}
                                </th>
                                <td className="px-6 py-4">
                                    {pay.email}
                                </td>
                                <td className="px-6 py-4">
                                    ${pay.totalAmount}
                                </td>
                                <td className="px-6 py-4">
                                    {pay.date?.slice(0, 10)}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-green-500 font-semibold text-base">{pay.paymentStatus}</span>
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
        </div>
    );
};

export default ProMember;