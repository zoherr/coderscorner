"use client"
import CourseContents from '@/components/Course/CourseContents'
import { useLoadUserQuery } from '@/redux/features/Api/apiSlice'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {
    params: any
}

const page = ({ params }: Props) => {
    const id = params.id;

    const { isLoading, error, data } = useLoadUserQuery(undefined, {})

    useEffect(() => {
        if (data) {
            const isPurchased = data.user.courses.find((item: any) => item._id === id);
            if (!isPurchased) {
                redirect("/")
            }
            if (error) {

            }
        }


    }, [data, error])


    return (
        <>
            {
                isLoading ? (
                    <div className='loader m-auto mt-[100px] text-black dark:text-white'></div>
                ) : (

                    < CourseContents id={id} />
                )
            }
        </>
    )
}

export default page