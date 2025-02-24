"use client"
import { style } from '@/app/styles/style'
import { useLoadUserQuery } from '@/redux/features/Api/apiSlice'
import { useCreateOrderfailedMutation, useCreateOrdersMutation,  } from '@/redux/features/Orders/ordersApi'
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type Props = {
    setOpen: any
    data: any
}

const CheckOutForm = ({ setOpen, data }: Props) => {
    const stripe = useStripe();
    const elements = useElements()
    const [message, setMessage] = useState<any>("")
    const [createOrder, { data: orderData, error }] = useCreateOrdersMutation();
    const [loadUser, setLoadUser] = useState(false);
    const { } = useLoadUserQuery({ skip: loadUser ? false : true })
    const [isLoading, setIsLoading] = useState(false)
    const [orderFailed, { data: orderFailedData }] = useCreateOrderfailedMutation();

useEffect(() => {
    if (orderFailedData) {
        toast.error(orderFailedData.message)
    }
}, [orderFailedData])
    
    console.log(orderFailedData);
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsLoading(true)

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required"

        })

        if (error) {
            setMessage(error.message)
            setIsLoading(false)
            orderFailed(data._id);

         


        }
        else if (paymentIntent && paymentIntent.status === "succeeded") {
            setIsLoading(false)
            createOrder({
                courseId: data._id,
                payment_info: paymentIntent
            })

        }
        else if (paymentIntent && paymentIntent.status !== "succeeded") {
             setIsLoading(false)
             orderFailed(data._id);

            
        }
    }

    useEffect(() => {
        if (orderData) {
            setLoadUser(true)
            redirect(`/course-access/${data._id}`)
        }
        if (error) {
            const errorMessage = error as any;
            toast.error(errorMessage.data.message)
            redirect(`/course/${data._id}`)
        }
    }, [orderData, error])

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement id="link-authentication-element" />
            <PaymentElement id="payment-element" />
            <button disabled={isLoading || !stripe || !elements} id="submit" >
                <span id="button-text" className={`${style.button}`}>
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div className='text-[red] pt-2' id="payment-message">{message}</div>}
        </form>
    )
}

export default CheckOutForm