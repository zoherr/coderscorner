import React, { FC } from 'react'
import CoursePlayer from '@/app/utils/CoursePlayer'
import { style } from '@/app/styles/style';

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
}

const CoursePreview: FC<Props> = ({ active, handleCourseCreate, setActive, courseData }) => {
  const discountedPercentage = ((courseData?.estimatedPrice - courseData?.price) / courseData?.estimatedPrice) * 100
  const discountedPercentagePrice = discountedPercentage.toFixed(0)
  
  const prevButton = () =>{
    setActive(active - 1);
  }

  const createCourse = () =>{
    handleCourseCreate()
  }
  
  return (
    <div className='w-[80%] m-auto py-3 mb-5'>
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div>
        <div className="flex items-center">
          <h1 className="pt-5 text-[25px] pr-5 text-black dark:text-white">
            Price Value:
          </h1>
          <h1 className="pt-5 text-[25px] ">
            {courseData?.price === 0 ? "free" : "Rs. " + courseData?.price}
          </h1>
          <h1 className="pl-3 text-[20px] mt-2 line-through opacity-80">Rs. {courseData?.estimatedPrice}</h1>
          <h4 className="pl-5 pt-4 text-[22px]">
            {discountedPercentagePrice}% OFF
          </h4>
        </div>

        <div className="flex items-center mt-6">
          <div className="buynow">Buy Course</div>
        </div>

        <br />
        <div className='w-full flex items-center justify-between'>
          <div className={`${style.button} mr-8`} onClick={() => prevButton()}>Prev</div>

          <div onClick={() => createCourse()} className={`${style.button} ml-8`}>Next</div>
        </div>
      </div>
    </div>
  )
}

export default CoursePreview