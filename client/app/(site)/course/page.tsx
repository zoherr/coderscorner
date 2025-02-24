"use client"
import BlogData from "@/components/Blog/blogData";
import BlogCard from "@/components/Blog/BlogItem";
import BlogItem from "@/components/Blog/BlogItem";
import CourseCard from "@/components/Course/CourseCard";
import { useGetAllBlogQuery } from "@/redux/features/Blog/blogApi";
import { useGetUserAllCourseQuery } from "@/redux/features/Courses/coursesApi";
import { Metadata } from "next";
import { useEffect, useState } from "react";



type Props = {}

const CoursePage =  (props: Props) => {
  
  const { data, isLoading } = useGetUserAllCourseQuery({});
  const [courses, setCourses] = useState<any[]>([]);
  useEffect(() => {
      setCourses(data?.courses)
  }, [data])
  return (
    <>
      {/* <!-- ===== Blog Grid Start ===== --> */}
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {courses &&
                        courses.map((item:any,index:number)=>(
                            <CourseCard
                            item={item}
                            key={index}
                            />
                        ))

               }
          </div>
        </div>
      </section>
      {/* <!-- ===== Blog Grid End ===== --> */}
    </>
  );
};

export default CoursePage;
