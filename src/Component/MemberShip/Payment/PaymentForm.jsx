import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import './style.css'
import { useContext, useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Authentication/AuthProvider";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import useUserRole from "../../../Hook/useUserRole";

const PaymentForm = () => {
    const {user} = useContext(AuthContext);
    const [userFromDb, userRefetch] = useUserRole()
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    const totalPrice = 100;

    useEffect(()=>{
        axiosSecure.post('/create-payment-intent',{price: totalPrice})
        .then(res=>{
            setClientSecret(res.data.clientSecret)
        })
    }, [axiosSecure, totalPrice])

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })
        if(error){
            console.log('payment error:',error)
            Swal.fire({
                title: "Oops...",
                text: error?.message,
                icon: "error"
              });
        }
        else{
            console.log('payment method:',paymentMethod)
        }

        console.log(clientSecret)

        // ---------------------confirmPayment----------------------
        const {paymentIntent, error: paymentConfirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                }
            }
        })
        if(error){
            console.log(paymentConfirmError);
        }
        else{
            console.log('payment success:',paymentIntent)
            
            if(paymentIntent.status === 'succeeded'){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Payment successfull`,
                    showConfirmButton: false,
                    timer: 1500
                });
                

                const paymentInfo = {
                    email: user.email,
                    date: new Date(),
                    paymentStatus : 'success',
                    totalAmount: totalPrice,
                    PaymentId: paymentIntent.payment_method,
                }
                console.log(paymentInfo);
                const saveDatabase = await axiosSecure.post('/payment', paymentInfo)
                userRefetch();
                console.log(saveDatabase.data)
                navigate('/')
                
            }
        }
    }

    return (
        <div className="">
            <form className="lg:pl-2" onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 text-center " type="submit" disabled={!stripe || !clientSecret}>
                Comfirm Payment
            </button>
            
        </form>
        </div>
    );
};

export default PaymentForm;