import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { Link } from "react-router-dom";

const Home = () => {
    const axiosPublic = useAxiosPublic()

    const { data: topSurvey, isLoading } = useQuery({
        queryKey: ['topSurvey'],
        queryFn: async () => {
            const res = await axiosPublic.get('/topSurvey')
            return res.data;
        }
    })
    if (isLoading) {
        return <div className="flex justify-center"><span className="loading loading-spinner loading-md"></span></div>;
    }

    return (
        <div className="bg-[#F5FF90]">
            <div className="bg-[url('https://i.ibb.co/SPvRcV1/top-microsoft-azure-interview-questions-and-answers.jpg')] bg-cover bg-center h-3/4 md:h-full w-full rounded mb-4">
                <div className="text-center inset-0 bg-black bg-opacity-60 bg-blend-multiply py-36 space-y-3">
                    <h3 className="text-white text-3xl font-bold">Explore, Engage, Empower: Your Voice Matters!</h3>
                    <p className="text-white font-medium w-full md:w-2/3 mx-auto">Welcome to <span className="font-extrabold text-xl text-red-500">Survey Sphere</span>, where opinions meet innovation. Unleash the power of surveys, polls, and insightful discussions. Shape the narrative, discover trending topics, and join a community dedicated to making voices heard. Start your journey of discovery and collaboration today!</p>
                    <div>
                        <button className="btn btn-active hover:bg-[#01013D] btn-secondary bg-[#00008B] border-0 tracking-widest">Explore Us</button>
                    </div>
                </div>
            </div>
            {/* ------------------------------featureCard------------------------------ */}
            <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-center py-4">Top Picks: Crowd Favorites</h3>

                <div className="w-11/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center mx-auto">

                    {
                        topSurvey.map(survey => <div key={survey._id} className="max-w-sm p-6  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{survey.title}</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{survey.description.slice(0, 100)}...</p>
                            <div className="flex justify-between">
                                <h3 className="text-lg font-bold">Total Participated: {survey.voteSum}</h3>
                                <Link to={`/details/${survey._id}`}><button href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Read more
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor"
                                            d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </button></Link>
                            </div>
                        </div>)
                    }

                </div>
            </div>

            <div>
                <div className="mt-5">
                    <h3 className="font-bold text-3xl py-3 text-center mb-3">Meet Our Team</h3>
                    <div className="grid grid-cols-2 pt-4 md:grid-cols-4 p-5 gap-3 justify-center mx-auto rounded-md">
                        <div data-aos="fade-right"
                            data-aos-offset="300"
                            data-aos-easing="ease-in-sine" className="text-center space-y-1">
                            <img className="mx-auto rounded-full object-cover h-32 w-32" src="https://i.ibb.co/mFPTSLv/woman-poses-front-her-office-happy-entrepreneur-ai-generated-47726-15663.jpg" alt="" />
                            <h2 className="text-xl font-semibold">Sarah Mitchell</h2>
                            <p className="font-medium">Chief Executive Officer (CEO)</p>
                        </div>
                        <div className="text-center space-y-1">
                            <img className="mx-auto rounded-full object-cover h-32 w-32" src="https://i.ibb.co/NSN8NnK/man-wearing-jacket-with-jeans.webp" alt="" />
                            <h2 className="text-xl font-semibold">John Anderson</h2>
                            <p className="font-medium">Chief Operating Officer (COO)</p>
                        </div>
                        <div className="text-center space-y-1">
                            <img className="mx-auto rounded-full object-cover h-32 w-32" src="https://i.ibb.co/60smcsq/happy-young-business-woman-posing-isolated-against-city-landscape-background-935410-658.jpg" alt="" />
                            <h2 className="text-xl font-semibold">Emily Parker</h2>
                            <p className="font-medium">Creative Director</p>
                        </div>
                        <div className="text-center space-y-1">
                            <img className="mx-auto rounded-full object-cover h-32 w-32" src="https://i.ibb.co/kSB5ZmV/62e40d31205f75001879f378.webp" alt="" />
                            <h2 className="text-xl font-semibold">Alex Turner</h2>
                            <p className="font-medium">Customer Relations Manager</p>
                        </div>

                    </div>
                    <div className=" p-2">
                        <p className="text-center">Meet the dedicated individuals behind Survey-sphere. Our team is a vibrant blend of creativity, expertise, and passion for delivering exceptional survey experiences. We take pride in fostering innovation and collaboration to make your survey journey seamless and insightful. Get to know the faces driving Survey-sphere forward</p>
                    </div>
                </div>
            </div>

            <div className="w-11/12 mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-center py-5">Your Queries, Our Solutions</h3>
                <div className="join join-vertical w-full">
                    <div className="collapse collapse-arrow join-item border border-base-300">
                        <input type="radio" name="my-accordion-4" defaultChecked />
                        <div className="collapse-title text-xl font-medium">
                        Q1: How can I become a proUser on your website?
                        </div>
                        <div className="collapse-content">
                            <p>To become a proUser and unlock exclusive features, you can purchase a membership through our subscription plans. Once subscribed, you will enjoy benefits like the ability to comment on surveys and access premium content.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow join-item border border-base-300">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title text-xl font-medium">
                        Q2: What privileges do proUsers have on the platform?
                        </div>
                        <div className="collapse-content">
                            <p>ProUsers enjoy special privileges, including the ability to comment on surveys, access to advanced features, and a premium user experience. Upgrade today to enhance your engagement on our platform.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow join-item border border-base-300">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title text-xl font-medium">
                        Q3: Can I send feedback to a surveyor for their posted survey?
                        </div>
                        <div className="collapse-content">
                            <p>Yes! As a logged-in user, you can provide feedback to surveyors for their posted surveys. Your insights help surveyors improve and create more meaningful content.</p>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="footer text-gray-700 mt-6 p-10 bg-[#D6FFB7]">
                <aside>
                    <img className="w-36" src="https://i.ibb.co/F05hTwh/Ordnance-Survey-Logo-700x171.png" alt="" />
                    <p><span className="font-semibold text-black">Survey Sphere</span><br />Providing reliable services since 2020</p>
                </aside>
                <nav>
                    <header className="footer-title">Social</header>
                    <div className="grid grid-flow-col gap-4">
                        <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
                        <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
                        <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Home;