import React, { FC } from 'react'
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Props = {
    item: any;
    isProfile?: boolean;
}

const UserCourseCard: FC<Props> = ({ item, isProfile }) => {
    return (
        <>
            <motion.div
                variants={{
                    hidden: {
                        opacity: 0,
                        y: -20,
                    },

                    visible: {
                        opacity: 1,
                        y: 0,
                    },
                }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="animate_top rounded-lg bg-white  pb-5 shadow-solid-13 dark:bg-[#1E1E1E]"
            >

                <Link href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`} className="relative block z-0 aspect-[368/239]">
                    <Image src={item.thumbnail.url} alt="Thumbnail" fill className='rounded-lg p-1' />
                </Link>


                <div className="">

                    <h3 className="mb-3.5 mt-7.5 line-clamp-2 inline-block text-lg font-medium text-black duration-300 hover:text-primary dark:text-white px-4 dark:hover:text-primary xl:text-itemtitle2">
                        <Link href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}>
                            {`${item.name.slice(0, 40)}...`}
                        </Link>
                    </h3>


                    <div className={`bg-[#24CFA6] dark:bg-[#24CFA6]  text-white grid grid-cols-2 rounded-sm gap-2 py-2 mb-3 items-center `}>
                        <p className="text-lg text-center opacity-60 pl-6  font-normal">Instructor</p>
                        <h1 className="pl-0 text-center">{item.instructor}</h1></div>
                    {/* <p className="px-4 line-clamp-3">{item.price}</p> */}

                    <div className={` rounded-sm gap-2 py-2  items-center `}>
                        <Link href={`course-access/${item._id}`} >
                            <h1 className="pl-0 text-center text-[#24CFA6] text:bg-blue-500 text-[20px]">Enter To Course</h1>
                        </Link>
                        
                    </div>

                    {/* <p className="px-4 line-clamp-3">{item.price}</p> */}
                </div>


            </motion.div>
        </>
    )
}

export default UserCourseCard