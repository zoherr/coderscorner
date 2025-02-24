import { style } from '@/app/styles/style';
import React, { FC, useState } from 'react'

type Props = {
    courseInfo: any;
    setCourseInfo: (courseInfo: any) => void;
    active: number;
    setActive: (active: number) => void;
}

const CourseInformation: FC<Props> = ({ courseInfo, setCourseInfo, active, setActive }) => {

    const [dragging, setDragging] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setActive(active + 1);
    };

    const handleDragOver = (e: any) => {
        e.preventDefault();
        setDragging(true);
    }

    const handleDragLeave = (e: any) => {
        e.preventDefault();
        setDragging(false);
    }


    const handleDrop = (e: any) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {

                setCourseInfo({ ...courseInfo, thumbnail: reader.result })

            }
            reader.readAsDataURL(file);
        }
    }

    const handleFileChange = (e: any) => {
        const file = e.target.files?.[0]

        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    setCourseInfo({ ...courseInfo, thumbnail: reader.result })
                }
            }
            reader.readAsDataURL(file);
        }
    }


    return (
        <div className='w-[80%] m-auto mt-14'>
            <form onSubmit={handleSubmit} >

                <div>
                    <label htmlFor="" className={`${style.label} text-black dark:text-white`}>
                        Course Name
                    </label>
                    <input
                        type="text"
                        name=''
                        // required
                        value={courseInfo.name}
                        onChange={(e) => setCourseInfo({ ...courseInfo, name: e.target.value })} className={`${style.input}`}
                        id='name'
                        placeholder='C Programming'
                    />
                </div>

                <br />

                <div className='mb-5'>
                    <label htmlFor="" className={`${style.label} text-black dark:text-white`}>
                        Course Description
                    </label>
                    <textarea name="" id="" cols={10} rows={5}
                        placeholder='Data Structures & Algorithms(Java)'
                        className={`${style.input} !h-min !py-2`}
                        value={courseInfo.description}
                        onChange={(e) => setCourseInfo({ ...courseInfo, description: e.target.value })}
                    >

                    </textarea>
                </div>


                <br />
                <div className='w-full flex justify-between'>
                    <div className='w-[45%]'>
                        <label htmlFor="" className={`${style.label} text-black dark:text-white`}>
                            Course Price
                        </label>
                        <input
                            type="number"
                            name=''
                            // required
                            value={courseInfo.price}
                            onChange={(e) => setCourseInfo({ ...courseInfo, price: e.target.value })} className={`${style.input}`}
                            id='price'
                            placeholder='2500'
                        />
                    </div>
                    <div className='w-[50%]'>
                        <label htmlFor="" className={`${style.label} text-black dark:text-white`}>
                            Estimated Price (Optional)
                        </label>
                        <input
                            type="number"
                            name=''
                            // required
                            value={courseInfo.estimatedPrice}
                            onChange={(e) => setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })} className={`${style.input}`}
                            id='estimatedPrice'
                            placeholder='2000'
                        />
                    </div>
                </div>

                <br />
                <div>
                    <label htmlFor="" className={`${style.label} text-black dark:text-white`}>
                        Course Tags
                    </label>
                    <input
                        type="text"
                        name=''
                        // required
                        value={courseInfo.tags}
                        onChange={(e) => setCourseInfo({ ...courseInfo, tags: e.target.value })} className={`${style.input}`}
                        id='tags'
                        placeholder='DSA, MERN Stack, Typescript, Docker'
                    />
                </div>

                <br />
                <div>
                    <label htmlFor="" className={`${style.label} text-black dark:text-white`}>
                        Course Instructor
                    </label>
                    <input
                        type="text"
                        name=''
                        // required
                        value={courseInfo.instructor}
                        onChange={(e) => setCourseInfo({ ...courseInfo, instructor: e.target.value })} className={`${style.input}`}
                        id='tags'
                        placeholder='Taha M'
                    />
                </div>
                <br />
                <div className='w-full flex justify-between'>
                    <div className='w-[45%]'>
                        <label htmlFor="" className={`${style.label} text-black dark:text-white`}>
                            Course Level
                        </label>
                        <input
                            type="text"
                            name=''
                            // required
                            value={courseInfo.level}
                            onChange={(e) => setCourseInfo({ ...courseInfo, level: e.target.value })} className={`${style.input}`}
                            id='level'
                            placeholder='Beginner'
                        />
                    </div>
                    <div className='w-[50%]'>
                        <label htmlFor="" className={`${style.label} text-black dark:text-white`}>
                            Course Demo
                        </label>
                        <input
                            type="text"
                            name=''
                            // required
                            value={courseInfo.demoUrl}
                            onChange={(e) => setCourseInfo({ ...courseInfo, demoUrl: e.target.value })} className={`${style.input}`}
                            id='demoUrl'
                            placeholder='https://demo....com'
                        />
                    </div>
                </div>

                <br />
                <div className="w-full">
                    <input type="file"
                        accept='image/*'
                        id='file'
                        className='hidden'
                        onChange={handleFileChange}
                    />
                    <label htmlFor="file"
                        className={`w-full min-h-[10vh] rounded-lg dark:border-white border-black p-3 border flex items-center justify-center ${dragging ? "bg-blue-500 " : "bg-transparant"}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {
                            courseInfo.thumbnail ? (
                                <img src={courseInfo.thumbnail} alt="" className='max-h-full w-full object-cover rounded-md' />
                            ) : (
                                <span className='text-black dark:text-white'>
                                    Drag and drop your course thumbnail here
                                </span>
                            )
                        }


                    </label>
                </div>

                <br />
                <div className='w-full flex items-center justify-end'>
                    <input
                        type="submit"
                        value="Next"
                        className={`${style.button}`}

                    />
                </div>
            </form>
        </div>
    )
}

export default CourseInformation
