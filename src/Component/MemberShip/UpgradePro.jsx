import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./Payment/PaymentForm";

const stripePromise = loadStripe('pk_test_51OEnfwEKCviqmDKyovTyS1fPNeXHWySowVMQJgXcRuVjxifQIoOTvKA3eYpVy0DM7WZryJocappXPKsZnzJd92ej00HUuuu5Ew');

const UpgradePro = () => {
    
    return (
        <div className="px-0 lg:px-3 bg-[#F5FF90]">
            <div className="bg-[url('https://i.ibb.co/23kSRq3/membership-model.jpg')] bg-cover bg-center h-3/4 md:h-full w-full rounded mb-4">
                <div className="text-center inset-0 bg-black bg-opacity-60 bg-blend-multiply py-28 px-1 space-y-3">
                    <h3 className="text-white text-3xl font-bold">Unlock Premium Features with Our Exclusive Membership!</h3>
                    <p className="text-white font-medium w-full md:w-2/3 mx-auto">Join our exclusive membership program and take your experience to the next level! For just <span className="text-3xl font-bold text-red-600">$100</span>, you gain access to a plethora of premium features, ensuring a richer and more rewarding journey on our platform. Enjoy benefits such as early access to new surveys, priority participation in special events, and enhanced data insights. Your support helps us continue delivering top-notch surveys and services. </p>
                    <div>
                    </div>
                </div>
            </div>
            <div className="pb-7 px-4">
            <Elements stripe={stripePromise}>
                {/* form is comming */}
                <PaymentForm></PaymentForm>
            </Elements>
            </div>
        </div>
    );
};

export default UpgradePro;