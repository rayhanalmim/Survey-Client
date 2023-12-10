import ShowSurvey from "./ShowSurvey";
import useAllServey from "../../Hook/useAllServey";
import { useState } from "react";

const Surveys = () => {
    const [survey, isPending] = useAllServey();
    const [display, setDisplay] = useState([]);

    if (isPending) {
        return <div className="flex justify-center"><span className="loading loading-spinner loading-md"></span></div>;
    }


    const handleSortChange = (event) => {
        const selectedValue = event.target.value;

        if (selectedValue === 'vote') {
            const calculateSum = (entry) => {
                return entry.vote.yes + entry.vote.no;
            };

            // Sorting the data based on the sum of vote.yes + vote.no
            const sorted = [...survey].sort((a, b) => calculateSum(b) - calculateSum(a));
            const sortFilter = sorted.filter(item => item.status === 'publish')
            setDisplay(sortFilter)
        }
        if (selectedValue === 'like') {

            // Sorting the data based on the sum of vote.yes + vote.no
            const sorted = [...survey].sort((a, b) => b.like - a.like);
            const sortFilterLike = sorted.filter(item => item.status === 'publish')
            setDisplay(sortFilterLike)
        }
        if (selectedValue === 'dislike') {

            // Sorting the data based on the sum of vote.yes + vote.no
            const sorted = [...survey].sort((a, b) => b.dislike - a.dislike);
            const sortFilterDisLike = sorted.filter(item => item.status === 'publish')
            setDisplay(sortFilterDisLike)
        }
    };

    const filter = survey.filter(item => item.status === 'publish')



    return (
        <div className="px-2 md:px-4  lg:px-7 bg-[#F5FF90]">
            <div className="flex justify-end pt-3">
                <div className="flex gap-3">
                    <div className="flex justify-center items-center">
                        <h3 className="font-bold text-lg">Sort By: </h3>
                    </div>
                    <select defaultValue='default' onChange={handleSortChange} name='sort' id="sort" className=" border border-gray-300 bg-lime-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:border-gray-600 dark:placeholder-gray-40 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Sort By" required>
                    <option disabled hidden value='default'>Select</option>
                        <option value="vote">Vote</option>
                        <option value="like">Like</option>
                        <option value="dislike">DisLike</option>
                    </select>
                </div>
            </div>
            <div >
                {
                    display.length ? <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-5">
                         {
                            display.map(item => <ShowSurvey key={item._id} surveyData={item}></ShowSurvey>)
                        }
                    </div> : <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-5">
                        {
                            filter.map(item => <ShowSurvey key={item._id} surveyData={item}></ShowSurvey>)
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default Surveys;