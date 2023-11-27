import React from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import ShowComment from './ShowComment';
import useUserRole from '../../Hook/useUserRole';
import { FaRegStar } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Comment = ({ details, user, refetch }) => {
    const [userFromDb, ] = useUserRole()
    console.log(userFromDb)
    const axiosSecure = useAxiosSecure();
    const { questionOne, title, description, voted, like, dislike, _id, comment} = details;

    const handleComment = (e) =>{
        e.preventDefault();
        const comment = e.target.comment.value;
        const name = user.displayName;
        const commentInfo = {comment, name}
        console.log(commentInfo)

        axiosSecure.post(`/comment?id=${_id}`, commentInfo)
        .then(res=>{
            console.log(res.data)
            refetch()
        })
    }

    
    return (
        <div>
            <ol className="relative border-s pt-5 border-gray-200 dark:border-gray-700">
                {
                    comment.length ? 
                    comment.map(item=> <ShowComment key={item.comment} item={item}></ShowComment>) : <div className="p-3 mb-6 text-xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300"><h3>No comment Yet</h3></div>
                }
            </ol>
            {
                userFromDb.role === 'proUser' ?  <div>
                {/* --------------------inputComment---------------------- */}
                <form onSubmit={handleComment}>
                    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-lime-100 dark:bg-gray-700 dark:border-gray-600">
                        <div className="px-4 py-2 rounded-t-lg dark:bg-gray-800">
                            <label className="sr-only">Your comment</label>
                            <textarea name="comment" id="comment" rows="4" className="w-full px-0 text-sm text-gray-900 bg-lime-100 border-2 pl-2 pt-1 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
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
            </div> : 
            <div>
                <h3 className='text-gray-700 italic font-semibold'>Unlock Exclusive Benefits! <FaRegStar className='inline-block pb-1 text-2xl text-rose-500'></FaRegStar> Only subscribed members can comment here. Upgrade your experience by becoming a member today. Enjoy early access, premium content, and more!</h3>
                <div className='flex justify-center items-center mt-2'>
                    <Link to='/upgrade'><button className='btn text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 text-center'>Subscribe Now</button></Link>
                </div>
            </div>
            }
           
        </div>
    );
};

export default Comment;