import React from 'react';
import Title from '../../../Component/template/Title';
import useWisePostedSurvey from '../../../Hook/useWisePostedSurvey';

const MyPostedSurvey = () => {
    const [UserWiseSurvey, isPending, isFetching, refetch] = useWisePostedSurvey();
    
    return (
        <div>
            <Title title={'Manage Survey'}></Title>
        </div>
    );
};

export default MyPostedSurvey;