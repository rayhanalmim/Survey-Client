import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "./AuthProvider";
import { updateProfile } from "firebase/auth";
import useAxiosPublic from "../Hook/useAxiosPublic";

const SingUp = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { createUser } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const handleSingUp = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const img = e.target.image.value;

        console.log(email, password)

        if (password.length < 6) {
            toast.error('Password length must be at least six characters', {
                position: "top-left",
                theme: "dark",
            });
            return;
        }

        // const isContainsUppercase = /^(?=.*[A-Z]).*$/;
        // const specialCharacter = /[!@#$%^&*(),.?":{}|<>]/;

        // if (!isContainsUppercase.test(password)) {
        //     toast.error('Password must be have at least one uppercase latter', {
        //         position: "top-left",
        //         theme: "dark",
        //     });
        //     return;
        // }
        // if (!specialCharacter.test(password)) {
        //     toast.error('Password must be have at least one special character', {
        //         position: "top-left",
        //         theme: "dark",
        //     });
        //     return;
        // }
        createUser(email, password)
            .then((result) => {
                const currentUser = result.user;
                result.user.displayName = name;
                result.user.photoURL = img;

                updateProfile(currentUser,{
                    displayName: name, 
                    photoURL: img,
                })
                .then(()=>{
                    console.log(result)
                    const name =  currentUser.displayName;
                    const email = currentUser.email;
                    const role = 'user';
                    const userInfo = { name, email, role };
                    console.log(userInfo)
                    axiosPublic.post(`/users`, userInfo)
                        .then(res => {
                            console.log(res.data)
                            toast.success('Congratulations! Account created successfully', {
                                position: "top-left",
                                theme: "dark",
                            });
                            navigate('/')
                        })
                })
                .catch(error=>console.log(error))
            })
            .catch(error => {
                const errorMessage = error.message;
                toast.error(errorMessage, {
                    position: "top-left",
                    theme: "dark",
                });
            })

    }

    return (
        <div className="flex flex-col-reverse lg:flex-row justify-center bg-[#F5FF90] pt-4">

            <div className="w-full mx-auto pb-10 lg:w-1/2 max-w-sm p-4 bg-lime-100 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 text-black dark:border-gray-700">

                <form onSubmit={handleSingUp} className="space-y-6">
                    <h5 className="text-xl font-medium text-gray-900 ">Create an account</h5>
                    <div className="space-y-3">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Enter Your Name</label>
                            <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 " placeholder="Your Name" required />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Enter Your image URL</label>
                            <input type="text" name="img" id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 " placeholder="Your image URL" required />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Enter Your Email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 " placeholder="Email Address" required />
                        </div>

                    </div>
                    <div className="relative">
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Create a password</label>
                        <input

                            type={!showPassword ? "password" : "text"}
                            name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 " required />
                        <span onClick={() => setShowPassword(!showPassword)} className="absolute bottom-3.5 hidden md:block left-72">

                            {
                                showPassword ? <AiFillEyeInvisible></AiFillEyeInvisible> : <AiFillEye></AiFillEye>
                            }

                        </span>
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                            </div>
                            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">terms and conditions</label>
                        </div>
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Account</button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Already registered? <Link to='/login' href="#" className="text-blue-700 hover:underline dark:text-blue-500">Log In</Link>
                    </div>
                </form>
            </div>

            <div className="w-1/2 hidden lg:block pl-10 pt-14">
                    <img src="https://i.ibb.co/vXVXVQD/illustration-people-login.png" alt="" />
                </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default SingUp;