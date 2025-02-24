import React, { useEffect, useState } from 'react'
import CourseCard from '../Course/CourseCard'
import { useGetUserAllCourseQuery } from '@/redux/features/Courses/coursesApi'
import UserCourseCard from '../Course/UserCourseCard'

type Props = {
    user: any
}

const UserCourseInfo = ({ user, }) => {
    const { data, isLoading } = useGetUserAllCourseQuery({});
    const [courses, setCourses] = useState<any[]>([]);
    useEffect(() => {
        setCourses(data?.courses)
    }, [data])
    return (
        <>
         <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
        {
            courses  && 
            courses.map((item: any, index: number) => {
                const isPurchased = user && user?.courses?.find((course: any) => course._id === item._id);
                return isPurchased ? (
                    <UserCourseCard
                        item={item}
                        key={index}
                    />
                ) : null;
            })
    }
    </div>
    </div>
    </>
    
  )
}

export default UserCourseInfo