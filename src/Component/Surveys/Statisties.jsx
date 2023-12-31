import { FaVoteYea } from "react-icons/fa";
import { FcDislike } from "react-icons/fc";
import { BiDislike, BiLike } from "react-icons/bi";
import { useContext, useState } from "react";
import { AuthContext } from "../../Authentication/AuthProvider";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Statisties = ({id}) => {
    const [likes, setlikes] = useState(true);
    const [disLike, setDisLike] = useState(true);
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    
    const { data: details, refetch, isLoading } = useQuery({
        queryKey: ['surveddys'],
        queryFn: async () => {
            const res = await axiosPublic.get(`details/${id}`)
            return res.data;
        }
    })

    if (isLoading) {
        return <div className="flex justify-center"><span className="loading loading-spinner loading-md"></span></div>
    }

    const {  voted, like, dislike,timestamp, _id} = details;
    const date = timestamp.slice(0,10)

    const handleLike = () =>{
        setlikes(!likes)
        axiosSecure.post(`/likes?value=${likes}&user=${user.email}&id=${_id}`)
        .then(()=>{
            refetch()
            setDisLike(true)
        })
    }
    const handleDislike = () =>{
        setDisLike(!disLike)
        axiosSecure.post(`/dislike?value=${disLike}&user=${user.email}&id=${_id}`)
        .then(()=>{
            refetch()
            setlikes(true)
        })
    }

    return (
        <div className="stats shadow flex flex-col sm:flex-row bg-lime-100">

            <div className="stat">
                <div className="stat-figure text-primary hidden md:block">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </div>
                <div className="stat-title">Total Likes</div>
                <div className="stat-value text-primary">{like}</div>
                <div className=""> <button onClick={handleLike} className="btn btn-sm mt-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium px-4 rounded-lg text-sm text-center">Like<BiLike></BiLike></button></div>
            </div>

            <div className="stat">
                <div className="stat-figure hidden md:block text-secondary">
                <FcDislike className="text-3xl"></FcDislike>
                </div>
                <div className="stat-title">Total Dislike</div>
                <div className="stat-value text-secondary">{dislike}</div>
                <div className="flex">
                    <button onClick={handleDislike} className="btn btn-sm mt-2 text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm text-center">Dislike<BiDislike ></BiDislike></button>
                    </div>
            </div>

            <div className="stat">
                <div className="stat-figure hidden md:block text-secondary">
                <FaVoteYea className="text-3xl"></FaVoteYea>
                </div>
                <div className="stat-value">{voted.length}</div>
                <div className="stat-title">Total Vote</div>
                <div className="stat-desc text-secondary font-semibold">Deadline <span className="text-red-400">{date}</span></div>
            </div>

        </div>
    );
};

export default Statisties;