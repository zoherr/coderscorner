import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IoCheckmarkDone, IoCloseOutline } from "react-icons/io5";
import CoursePlayer from '@/app/utils/CoursePlayer';
import Link from "next/link";
import { Elements } from "@stripe/react-stripe-js"
import { style } from '@/app/styles/style';
import CheckOutForm from './CheckOutForm'
import toast from 'react-hot-toast';
import { GrLanguage } from "react-icons/gr";
import { FaLanguage, FaClock } from "react-icons/fa6";
import { useGetUserAllCourseQuery } from '@/redux/features/Courses/coursesApi';
import CourseCard from './CourseCard';
import SuggestionCourseCard from './SuggestionCourse';


type Props = {
  data: any
  stripePromise: any
  clientSecret: string
}

const CourseDetails = ({ data, stripePromise, clientSecret }: Props) => {
  const { data: d, isLoading: isl } = useGetUserAllCourseQuery({});
  const [courses, setCourses] = useState<any[]>([]);
  useEffect(() => {
    setCourses(d?.courses)
  }, [d])
  const { user } = useSelector((state: any) => state.auth)
  const discountedPercentage = ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100
  const discountedPercentagePrice = discountedPercentage.toFixed(0)
  const isPurchased = user && user?.courses?.find((item: any) => item._id === data._id)
  const [open, setOpen] = useState(false)
  const handleOrder = (e: any) => {
    if (user) {
      setOpen(true);
    } else {
      // Show toast error indicating the user needs to log in
      toast.error("Login Please")
    }
  }
  console.log(data)

  return (
    <div>
      <div className="mx-auto py-4 w-[90%] 800px:w-[90%]">
        <h1 className="text-black sm:text-[55px] text-[35px] mb-10 sm:mb-0 leading-10 sm:leading-[80px]  dark:text-white">{data.name}</h1>
        <div className="w-full flex flex-col-reverse md:flex-row">
          <div className="w-full sm:w-2/5 my-10 mt-5 ">

            <div className='flex gap-3 my-12'>
              <div className='flex-shrink-0 text-xs  uppercase px-2 py-2 rounded bg-white  text-[#000]  w-[110px] text-center font-light'>
                {data.level}
              </div>
            </div>
            {
              isPurchased ? (
                <div className='flex gap-4 '>
                  <h1 className='text-black dark:text-white text-[25px] sm:text-[35px]'>Enjoy Your Journey! 🚀 </h1>

                </div>
              ) : (
                <div className='flex gap-4 '>
                  <h1 className='text-black dark:text-white text-[25px] sm:text-[35px]'>Price Value:</h1>
                  <p className='text-[#24CFA6] text:bg-blue-500 text-[25px] sm:text-[35px]'>₹{data.price}</p>
                </div>
              )
            }


            {
              isPurchased ? (

                <Link className={`mt-10 flex w-full sm:w-2/5 justify-center rounded-md bg-[#24CFA6] px-3 py-4.5 text-lg leading-6 text-white shadow-sm hover:bg-[#24CFA6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer`} href={`/course-access/${data._id}`}>
                  Enter To course
                </Link>
              ) : (
                <div className={`mt-10 flex w-full sm:w-2/5 justify-center rounded-md bg-[#24CFA6] px-3 py-4.5 text-lg leading-6 text-white shadow-sm hover:bg-[#24CFA6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer`}
                  onClick={handleOrder}
                >
                  Buy now
                </div>
              )
            }
            <div className='perks  text-black dark:text-white mt-2'>
              <div className="perk"> <FaClock className='text-black dark:text-white 	' />
                <h1 className="name flex">
                  <span>Chepter: </span>{data.courseData.length}</h1>
              </div>
              <div className="perk">
                <GrLanguage className='text-black dark:text-white 	' />
                <h1 className="name"><span> Language: </span>Hindi</h1>
              </div>
            </div>

            <div className={`bg-blue-200 dark:bg-blue-200 sm:w-3/5 md:w-3/5 lg:w-3/5 xl:w-3/5  bg-opacity-30 dark:bg-opacity-25 text-white grid grid-cols-2 rounded-lg gap-2 py-2 items-center my-8 `}>
              <p className="text-sm text-center opacity-60 pl-6 text-black dark:text-white font-medium">Instructor</p>
              <h1 className="pl-0 text-sm text-black dark:text-[#24CFA6] text-center">{data.instructor}</h1></div>

            {
              isPurchased ? (
                <div className='openUpdates'>
                  <span className='text-white' >New Update Added soon</span>
                  <img src="https://www.sheryians.com/images/6297329.webp" alt="" />
                </div>
              ) : (
                <div className='openUpdates'>
                  <span className='text-white' >New Update Added soon</span>
                  <img src="https://www.sheryians.com/images/6297329.webp" alt="" />
                </div>
              )
            }




          </div>
          <div className="w-full sm:w-1/2 pt-18 relative ">
            <div className=" top-[90px]   z-50 w-full left-[50px]  sm:ml-7">
              <CoursePlayer
                videoUrl={data?.demoUrl}
                title={data?.title}
              />
            </div>

          </div>

        </div>
        <div >
          <h1 className="sm:text-[30px] md:text-[30px] lg:text-lg xl:text-xl text-black dark:text-white pb-4 leading-tight  my-4 font-thin w-full">{data.description}</h1>

          <div className='my-12'>
            <h1 className="text-[35px] font-[600] text-black dark:text-white pb-4 leading-[50px] ">What you will learn from this course ? </h1>
            <div >
              {data.benefits?.map((item: any, index: number) => (
                <div className='w-full flex 800px:items-center py-2' key={index}>
                  <div className='w-[15px] mr-1'>
                    <IoCheckmarkDone size={20} className='text-black dark:text-white' />
                  </div>
                  <p className='pl-2 text-black dark:text-white'>{item.title}</p>
                </div>
              ))}

            </div>
          </div>
          <br />
          <div className=''>
            <h1 className="text-[35px] font-[600] text-black dark:text-white pb-4 leading-[50px] ">Some Prerequsites.. </h1>
            <div >
              {data.prerequisites?.map((item: any, index: number) => (
                <div className='w-full flex 800px:items-center py-2' key={index}>
                  <div className='w-[15px] mr-1'>
                    <IoCheckmarkDone size={20} className=' text-black dark:text-white' />
                  </div>
                  <p className='pl-2 text-black dark:text-white'>{item.title}</p>
                </div>
              ))}

            </div>
          </div>
          <br />
          <br />
          {/* Suggestion */}
          <div className=''>
            <h1 className="text-[35px] font-[600] text-black dark:text-white pt-5 pb-4 leading-[50px] ">Some Other Courses.. </h1>
            <div className="mx-auto mt-5 max-w-c-1400 px-4 md:px-5 xl:mt-20 xl:px-0">
              <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-15">
                {courses &&
                 courses.slice(0,3).map((item:any,index:number)=>(
                    < SuggestionCourseCard
                      item={item}
                      key={index}
                    />
                  ))

                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <>
        {
          open && (
            <div className="w-full h-screen bg-[#00000036] fixed top-0 z-50 flex items-center justify-center left-0">
              <div className='w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3'>
                <div className="w-full flex justify-end">
                  <IoCloseOutline size={40} onClick={() => setOpen(false)} className=' text-black' />
                </div>
                <div className='text-center text-black'>After Payment, Please Refresh your page,if showing error</div>
                <div className="w-full">
                  {
                    stripePromise && clientSecret && (
                      <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <CheckOutForm setOpen={setOpen} data={data} />
                      </Elements>
                    )
                  }
                </div>
              </div>
            </div>
          )
        }
      </>
    </div>
  )
}

export default CourseDetails
