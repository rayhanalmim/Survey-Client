import { Link } from "react-router-dom";

const ShowSurvey = ({ surveyData }) => {
    const { title, description, voted, _id } = surveyData;
    // const limitedDiscription =

    const slicedString = description.slice(0, 130);

    console.log()
    return (
        <div>
            <div className="p-4 bg-lime-100 border rounded-lg md:p-8 dark:bg-gray-800" id="about" role="tabpanel" aria-labelledby="about-tab">
                <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">{title}</h2>
                <p className="text-gray-500 dark:text-gray-400">{slicedString}...</p>

                <div className="flex justify-between">
                    <h3 className="font-semibold text-lg text-gray-500 mb-2 mt-2">Total voted: {voted.length}</h3>
                    <Link to={`/details/${_id}`}>
                        <button href="#" className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700">
                            view details
                            <svg className=" w-2.5 h-2.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" d="m1 9 4-4-4-4" />
                            </svg>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ShowSurvey;