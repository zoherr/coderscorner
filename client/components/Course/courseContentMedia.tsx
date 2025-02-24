import { style } from '@/app/styles/style';
import CoursePlayer from '@/app/utils/CoursePlayer';
import { Diversity2Outlined } from '@mui/icons-material';
import React, { useState } from 'react'

type Props = {
    data: any;
    id: string;
    activeVideo: number
    setActiveVideo: (activeVideo: number) => void;
}

const CourseContentMedia = ({ data, id, activeVideo, setActiveVideo }: Props) => {
    const [active, setActive] = useState(0);
    return (
        <div className='w-[100%] sm:w-[86%] py-4 m-auto '>
            <div className="ml-0 w-full">
                <CoursePlayer
                    title={data[activeVideo]?.title}
                    videoUrl={data[activeVideo]?.videoUrl}

                />
            </div>
            <div className='w-full  flex item-center justify-between my-3'>
                <div className={`${style.buttonforplayer}   ${activeVideo === 0 && "!cursor-no-drop opacity-[0.5]"} `}
                    onClick={() => setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)}
                >
                    Prev
                </div>
                <div className={`${style.buttonforplayers}  ${data.length - 1 === activeVideo && "!cursor-no-drop opacity-[0.5]"}`}
                    onClick={() => setActiveVideo(data && data.length - 1 === activeVideo ? activeVideo : activeVideo + 1)}
                >
                    Next
                </div>

            </div>
            <h1 className="pt-2 mx-4 mt-7 text-[25px] text-black dark:text-white leading-8">📢 {data[activeVideo].title}</h1>
            <br />
            <div className="w-[93%] sm:w-full p-4 flex items-center justify-between border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem]  rounded-md dark:bg-gray-900 dark:border-black/40 dark:bg-opacity-75 mt-7 ml-3 sm:ml-0 ">
                {
                    ["Overview", "Resources"].map((text, index) => (
                        <div
                            key={index}
                            className={`w-full rounded-md flex items-center justify-center px-3  py-2 cursor-pointer ${active === index ? "bg-[#24CFA6] dark:bg-[#24CFA6] text-black " : "bg-transparent text-black dark:text-white"
                                }`}
                            onClick={() => setActive(index)}
                        >
                            <h5 className="pl-2  ">
                                {text}
                            </h5>
                        </div>
                    ))
                }

            </div>
            <br />
            {
                active === 0 && (
                    <p className='text-black w-[93%] sm:w-full ml-3 sm:ml-0  mx-1 dark:text-white'>
                        {data[activeVideo].description}
                    </p>
                )
            }
            {
                active === 1 && (
                    <div>
                        {
                            data[activeVideo]?.links.map((item: any) => (
                                <div className='text-black w-[93%] sm:w-[80%] ml-3 sm:ml-5  mx-1 dark:text-white mb-5'>
                                    <h2 className='text-[25px]'>
                                        {item.title && item.title + " : "}
                                    </h2>
                                    <a href={item.url} className=''>
                                        {item.url}
                                    </a>
                                </div>
                            ))
                        }
                    </div>
                )
            }

            <div>
           
            </div>
        </div>
    )
}

export default CourseContentMedia