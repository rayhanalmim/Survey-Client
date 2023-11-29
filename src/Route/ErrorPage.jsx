import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => { 
    const error = useRouteError();
    console.log(error);
    return (
        <div className="flex justify-center h-[100vh] items-center space-y-6">
            <div>
                <h1 className="text-center text-3xl font-extrabold">oppss!!</h1>
                <div>
                    <div className="text-center text-3xl font-extrabold">{error.status}</div>
                    <div className="text-center text-3xl font-extrabold">{error.statusText}</div>
                </div>
                <div className="justify-center flex pt-4">
                <Link to='/'><button className="btn btn-active btn-neutral">Back To Home</button></Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;