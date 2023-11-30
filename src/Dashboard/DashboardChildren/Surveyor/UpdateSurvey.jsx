import { useNavigate, useParams } from "react-router-dom";
import Title from "../../../Component/template/Title";
import useSurvey from "../../../Hook/useSurvey";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Authentication/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const UpdateSurvey = () => {
    const {id} = useParams();
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const objectId = {id};
    const [details, isPending, isFetching, refetch, isLoading] = useSurvey(objectId);
    console.log(details);
    const { questionOne, title, description, vote, _id, category } = details;
    if (isLoading) {
        return <div className="flex justify-center"><span className="loading loading-spinner loading-md"></span></div>;
    }

    

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        
        console.log(data);
        
        axiosSecure.patch(`/updateSurvey?id=${id}`, data)
        .then(res=>{
            console.log(res.data)
            Swal.fire({
                title: "Updated!",
                text: "Your file has been Updated.",
                icon: "success"
              });
            reset();
            navigate('/dashboard/mypostedsurvey');
        })

    }

    return (
        <div>
            <Title title={'Update Survey'}></Title>
            <div>
                <form className="p-5 rounded-lg mb-5" onSubmit={handleSubmit(onSubmit)}>

                    <div className="flex gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Survey Title*</span>
                            </label>
                            <input defaultValue={title} required {...register("title")} type="text" placeholder="Title" className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Category*</span>
                            </label>
                            <select required defaultValue='default' {...register("category")} className="select select-bordered">
                                <option disabled hidden value={category}>{category}</option>
                                <option value='Food'>Food</option>
                                <option value='Travel'>Travel</option>
                                <option value='Education'>Education</option>
                                <option value='Health'>Health</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Question*</span>
                        </label>
                        <input defaultValue={questionOne} required {...register("questionOne")} type="text" placeholder="Your question" className="input input-bordered w-full" />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Survey details*</span>
                        </label>
                        <textarea defaultValue={description} required {...register("description")} className="textarea textarea-bordered h-24" placeholder="About Survey"></textarea>
                    </div>
                    {/* errors will return when field validation fails  */}
                    <br />
                    <input className="btn btn-active btn-neutral px-8 w-full " type="submit" />
                </form>
            </div>
        </div>
    );
};

export default UpdateSurvey;