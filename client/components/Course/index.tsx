"use client"
import React, { useEffect, useState } from 'react'
import SectionHeader from '../Common/SectionHeader';
import { useGetUserAllCourseQuery } from '@/redux/features/Courses/coursesApi';
import CourseCard from './CourseCard';
type Props = {}

const Course = (props: Props) => {
    const { data, isLoading } = useGetUserAllCourseQuery({});
    const [courses, setCourses] = useState<any[]>([]);
    useEffect(() => {
        setCourses(data?.courses)
    }, [data])

    return (
        <section id="course" className="py-20 lg:py-25 xl:py-30">
            <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
                {/* <!-- Section Title Start --> */}
                <div className="animate_top mx-auto text-center">
                    <SectionHeader
                        headerInfo={{
                            title: `Courses `,
                            subtitle: `What would you like to learn?              `,
                            description: ``,
                        }}
                    />
                </div>
                {/* <!-- Section Title End --> */}
            </div>

            <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
               {courses &&
                        courses.slice(0,3).map((item:any,index:number)=>(
                            <CourseCard
                            item={item}
                            key={index}
                            />
                        ))

               }
                </div>
            </div>
        </section>
    );

}

export default Course