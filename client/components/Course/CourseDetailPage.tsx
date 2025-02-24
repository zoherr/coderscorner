import Heading from '@/app/utils/heading';
import { useGetCourseDetailsQuery, useGetUserAllCourseQuery } from '@/redux/features/Courses/coursesApi';
import React, { useEffect, useState } from 'react'
import CourseDetails from './CourseDetails';
import { useCreatePaymentIntentMutation, useGetStripePublishableKeyQuery } from '@/redux/features/Orders/ordersApi';
import { loadStripe } from '@stripe/stripe-js';

type Props = {
    id: string
}

const CourseDetailPage = ({ id }: Props) => {

  

    const [route, setRoute] = useState("login");
    const [open, setOpen] = useState(false);
    const { data, isLoading, isError } = useGetCourseDetailsQuery(id)
    const [createPaymentIntent, { data: paymentIntentData }] = useCreatePaymentIntentMutation()
    const { data: config } = useGetStripePublishableKeyQuery({})
    const [stripePromise, setStripePromise] = useState<any>(null);
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        if (config) {
            const publishablekey = config.publishableKey;
            setStripePromise(loadStripe(publishablekey));
        }

        if (data) {
            const amount = Math.round(data.course.price * 100);
            createPaymentIntent(amount)
        }
    }, [config, data])

    useEffect(() => {
        if (paymentIntentData) {
            setClientSecret(paymentIntentData?.client_secret)
        }
    }, [paymentIntentData])



    if (isLoading) {
        return <div className='loader m-auto mt-[100px] text-black dark:text-white'></div>; // Render loading state
    }

    if (isError) {
        return <div>Error occurred while fetching data</div>; // Render error state
    }

    // Check if data is available before accessing its properties
    if (!data || !data.course) {
        return <div>No course data available</div>; // Render when data or course is not available
    }

    return (
        <>
            <Heading
                title={data.course.name}
                description="Elevate your programming skills, solve challenges, and unlock the world of coding possibilities. Made by SMB innovation."
                keywords="Coder's Corner, coder's corner, coder's-corner"
            />
            {
                stripePromise && (
                    <CourseDetails
                        data={data.course}
                        stripePromise={stripePromise}
                        clientSecret={clientSecret}
                    />
                )
            }
        </>
    )
}

export default CourseDetailPage;
