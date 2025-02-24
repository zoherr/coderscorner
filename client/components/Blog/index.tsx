'use client'
import React, { useEffect, useState } from "react";
import SectionHeader from "../Common/SectionHeader";
import BlogItem from "./BlogItem";
import BlogData from "./blogData";
import { useGetAllBlogQuery } from "@/redux/features/Blog/blogApi";
import BlogCard from "./BlogItem";
type Props = {}

const Blog =  (props: Props) => {
  const { data, isLoading } = useGetAllBlogQuery({});
  const [blog, setBlog] = useState<any[]>([]);
  useEffect(() => {
    setBlog(data?.blog)
  }, [data])
  return (
    <section id="blog" className="py-20 lg:py-25 xl:py-30">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        {/* <!-- Section Title Start --> */}
        <div className="animate_top mx-auto text-center">
          <SectionHeader
            headerInfo={{
              title: `BLOGS `,
              subtitle: `What would you like to Read?              `,
              description: ``,
            }}
          />
        </div>
        {/* <!-- Section Title End --> */}
      </div>

      <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
        {blog &&
                        blog.slice(0,3).map((item:any,index:number)=>(
                            <BlogCard
                            item={item}
                            key={index}
                            />
                        ))

               } 
        </div>
      </div>
    </section>
  );
};

export default Blog;
