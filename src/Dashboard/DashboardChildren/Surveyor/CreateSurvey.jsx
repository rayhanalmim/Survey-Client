import { useForm } from "react-hook-form";
import Title from "../../../Component/template/Title";
import { useContext } from "react";
import { AuthContext } from "../../../Authentication/AuthProvider";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const CreateSurvey = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        const temp = {...data,
            "like": 0,
            "dislike": 0,
            "surveyor": user.email,
            "vote": {
                "yes": 0,
                "no": 0
            },
            "voted": [],
            "likesBy": [],
            "dislikesBy": [],
            "timestamp": new Date(),
            "status": "publish",
            "feedback": [],
            "comment": [],
            "report": [],
            "adminFeedback": "",
            "feelBackBy": []
        }
        console.log(temp);
        
        axiosSecure.post('/createsurvey', temp)
        .then(res=>{
            console.log(res.data)
            reset();
        })

    }

    return (
        <div>
            <Title title={'Create Survey'}></Title>
            <div>
                <form className="p-5 rounded-lg mb-5" onSubmit={handleSubmit(onSubmit)}>

                    <div className="flex gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Survey Title*</span>
                            </label>
                            <input required {...register("title")} type="text" placeholder="Title" className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Category*</span>
                            </label>
                            <select required defaultValue='default' {...register("category")} className="select select-bordered">
                                <option disabled hidden value='default'>category</option>
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
                        <input required {...register("questionOne")} type="text" placeholder="Your question" className="input input-bordered w-full" />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Survey details*</span>
                        </label>
                        <textarea required {...register("description")} className="textarea textarea-bordered h-24" placeholder="About Survey"></textarea>
                    </div>
                    {/* errors will return when field validation fails  */}
                    <br />
                    <input className="btn btn-active btn-neutral px-8 w-full " type="submit" />
                </form>
            </div>
        </div>
    );
};

export default CreateSurvey;