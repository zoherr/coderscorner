import Protected from '@/app/(site)/hooks/useProtected'
import Heading from '@/app/utils/heading';
import { useGetCourseContentQuery } from '@/redux/features/Courses/coursesApi';
import React, { useState } from 'react'
import CourseContentMedia from './courseContentMedia';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

type Props = {
    id: string;
}

const CourseContents = ({ id }: Props) => {
    const { data: courseData, isLoading } = useGetCourseContentQuery(id)
    const [isCollapsed, setIsCollapsed] = useState(true)
    const data = courseData?.content
    const [activeVideo, setActiveVideo] = useState(0)
    return (
        <>
            <Protected>
                {
                    isLoading ? (
                        <div className='loader m-auto mt-[100px] text-black dark:text-white'></div>
                    ) :
                        (
                            <div className='my-22 w-full flex flex-col  sm:grid sm:grid-cols-10'>
                                <Heading
                                    title="Corder's Corner"
                                    description="Elevate your programming skills, solve challenges, and unlock the world of coding possibilities.made by SMB innovation"
                                    keywords="smb innovation,smb innov,zoher rangwala,Zoher Rangwala,Zoher R,Coder's Corner,coder's corner,coder's-corner"
                                />
                                <div className="sm:col-span-7">
                                    < CourseContentMedia
                                        data={data}
                                        id={id}
                                        activeVideo={activeVideo}
                                        setActiveVideo={setActiveVideo}
                                    />
                                </div>
                                <div className="sm:col-span-3">

                                    <div className="w-[93%]  sm:w-[93%] p-6  items-center justify-between border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem]  rounded-md dark:bg-gray-900 dark:border-black/40 dark:bg-opacity-75 mt-3 ml-3 sm:ml-0 ">
                                        <div className=' flex justify-between'>
                                        <h1 className='text-center mt-3 mb-8 text-black dark:text-white text-[25px]'>Course Section</h1>
                                        <MdOutlineKeyboardArrowDown
                                                size={25}
                                                className='dark:text-white text-black mt-3 mb-8 cursor-pointer'

                                                onClick={() => setIsCollapsed(!isCollapsed)}
                                            />
                                        </div>
                                        {
                                            isCollapsed && (
                                                <>
                                                {
                                                    data.map((item: any, index) => (

                                                        <div
                                                            key={index}
                                                            className={`w-full rounded-md flex my-5 items-center  px-3  py-4 cursor-pointer ${activeVideo === index ? "bg-[#24CFA6] dark:bg-[#24CFA6] text-black" : "bg-transparent text-black dark:text-white"
                                                                }`}

                                                            onClick={() => setActiveVideo(index)}>
                                                            <h2 className='text-[20px] sm:text-[20px] pl-2'>
                                                                {index + 1}  :  {item.title && item.title + " : "}
                                                            </h2>

                                                        </div>
                                                    ))
                                                }
                                                </>
                                            )
                                        }

                                    </div>
                                </div>
                            </div>
                        )
                }
            </Protected>
        </>
    )
}

export default CourseContents
