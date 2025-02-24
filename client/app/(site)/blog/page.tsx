"use client"
import BlogData from "@/components/Blog/blogData";
import BlogCard from "@/components/Blog/BlogItem";
import BlogItem from "@/components/Blog/BlogItem";
import { useGetAllBlogQuery } from "@/redux/features/Blog/blogApi";
import { Metadata } from "next";
import { useEffect, useState } from "react";



type Props = {}

const BlogPage =  (props: Props) => {
    const { data, isLoading } = useGetAllBlogQuery({});
    const [blog, setBlog] = useState<any[]>([]);
    useEffect(() => {
      setBlog(data?.blog)
    }, [data])
  return (
    <>
      {/* <!-- ===== Blog Grid Start ===== --> */}
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {blog &&
                        blog.map((item:any,index:number)=>(
                            <BlogCard
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

export default BlogPage;
