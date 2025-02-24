
import Heading from "@/app/utils/heading";
import RelatedPost from "@/components/Blog/RelatedPost";
import SharePost from "@/components/Blog/SharePost";
import { useGetBlogDetailsQuery } from "@/redux/features/Blog/blogApi";
import Image from "next/image";
import React from "react"
import { format } from "timeago.js"

type Props = {
    id: string
}

const SingleBlogPage = ({ id }: Props) => {

  const { data, isLoading, isError } = useGetBlogDetailsQuery(id)
  // console.log(id,data.blog)
  if (isLoading) {
    return     <div className='loader m-auto mt-[100px] text-black dark:text-white'></div>; // Render loading state
}


 
  return (

    <>
      <Heading
        title={data.blog.title}
        description="Elevate your programming skills, solve challenges, and unlock the world of coding possibilities.made by SMB innovation"
        keywords="smb innovation,smb innov,zoher rangwala,Zoher Rangwala,Zoher R,Coder's Corner,coder's corner,coder's-corner"
      />

      <section className="pb-25 pt-25 lg:pb-25 lg:pt-25 xl:pb-25 xl:pt-25">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex flex-col-reverse gap-7.5 lg:flex-row xl:gap-12.5">
            <div className="md:w-1/2 lg:w-[32%]">
            

              {/* <div className="animate_top mb-10 rounded-md border border-stroke bg-white p-9 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
                <h4 className="mb-7.5 text-2xl font-semibold text-black dark:text-white">
                  Categories
                </h4>

                <ul>
                  <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
                    <a href="#">Blog</a>
                  </li>
                  <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
                    <a href="#">Events</a>
                  </li>
                  <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
                    <a href="#">Grids</a>
                  </li>
                  <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
                    <a href="#">News</a>
                  </li>
                  <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
                    <a href="#">Rounded</a>
                  </li>
                </ul>
              </div> */}

              <RelatedPost />
            </div>

            <div className="lg:w-2/3">
              <div className="animate_top rounded-md border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection md:p-10">
                <div className="mb-10 w-full overflow-hidden ">
                  <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                    <Image
                      src={data.blog.image.url}
                      alt="Kobe Steel plant that supplied"
                      fill
                      className="rounded-md object-contain object-center"
                    />
                  </div>
                </div>

                <h2 className="mb-5 mt-11 text-3xl font-semibold text-black dark:text-white 2xl:text-sectiontitle2">
                {data.blog.title}
                </h2>

                <ul className="mb-9 flex flex-wrap gap-5 2xl:gap-7.5">
                  <li>
                    <span className="text-black dark:text-white">Author: </span>{" "}
                    {data.blog.author}
                  </li>
                  <li>
                    <span className="text-black dark:text-white">
                      Published On: {format(data.blog.createdAt)}
                    </span>{" "}
                  </li>
                
                  <li>
                    <span className="text-black dark:text-white">
                      Category:
                    </span>
                    {data.blog.category}
                  </li>
                </ul>
                <h3 className="py-4 text-[20px] text-black dark:text-white">
                   {data.blog.subject}
                  </h3>

                <div className="blog-details">

                  <p>
                   {data.blog.blogData}
                  </p>


            
                </div>

                <SharePost  />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleBlogPage;
