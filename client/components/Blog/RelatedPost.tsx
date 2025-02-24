"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BlogData from "./blogData";
import { useGetAllBlogQuery } from "@/redux/features/Blog/blogApi";

const RelatedPost =  () => {
  const { data, isLoading } = useGetAllBlogQuery({});
  const [blog, setBlog] = useState<any[]>([]);
  useEffect(() => {
    setBlog(data?.blog)
  }, [data])
  return (
    <>
      <div className="animate_top rounded-md border border-stroke bg-white p-9 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
        <h4 className="mb-7.5 text-2xl font-semibold text-black dark:text-white">
          Related Posts
        </h4>

        <div>
          { blog && blog.map((post:any, index:number) => (
            <div
              className="mb-7.5 flex flex-wrap gap-4 xl:flex-nowrap 2xl:gap-6"
              key={index}
            >
              <div className="max-w-45 relative h-18 w-45">
                {post.image.url ? (
                  <Image fill src={post.image.url } alt="Blog" />
                ) : (
                  "No image"
                )}
              </div>
              <h5 className="text-md font-medium text-black transition-all duration-300 hover:text-primary dark:text-white dark:hover:text-primary">
                <Link href={ `/blog/${post._id}` }>
                  {" "}
                  {post.title.slice(0, 40)}...
                </Link>
              </h5>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RelatedPost;
