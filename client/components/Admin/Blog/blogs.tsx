"use client";
import { style } from "@/app/styles/style";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import toast from 'react-hot-toast'

const Blogs = () => {
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);

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
        setblog({ ...blog, image: reader.result as string });
      }
      reader.readAsDataURL(file);
    }
  }

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.result !== null) {
          setblog({ ...blog, image: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const [blog, setblog] = useState({
    title: " ",
    image: " ",
    subject: " ",
    blogData: " ",
    author: " ",
    category: " ",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setblog({ ...blog, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/v1/submit-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
      });

      if (response.ok) {
        console.log("Form submitted successfully");
        toast.success("Blog Submitted Successfully!");
        setblog({
          title: " ",
          image: " ",
          subject: " ",
          blogData: " ",
          author: " ",
          category: " ",
        });
      } else {
        console.error("Blog submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Blog submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='w-[80%] m-auto mt-14'>
        <form onSubmit={handleSubmit}>

          <div>
            <label htmlFor="" className={`${style.label} text-black dark:text-white`}>
              Blog Name
            </label>
            <input
              type="text"
              name='title'
              value={blog.title}
              onChange={handleChange}
              placeholder='C Programming'
              className={`${style.input}`}
            />
          </div>

          <br />

          <div className='mb-5'>
            <label htmlFor="" className={`${style.label} text-black dark:text-white`}>
              Blog Data
            </label>
            <textarea name="blogData" id="" cols={10} rows={5}
              placeholder='Data Structures & Algorithms(Java)'
              className={`${style.input} !h-min !py-2`}
              value={blog.blogData}
              onChange={handleChange}
            >
            </textarea>
          </div>

          <br />

          <br />
          <div>
            <label htmlFor="" className={`${style.label} text-black dark:text-white`}>
              Blog Subject
            </label>
            <input
              type="text"
              name='subject'
              value={blog.subject}
              onChange={handleChange}
              className={`${style.input}`}
              id='tags'
              placeholder='DSA, MERN Stack, Typescript, Docker'
            />
          </div>

          <br />
          <div>
            <label htmlFor="" className={`${style.label} text-black dark:text-white`}>
              Blog Author
            </label>
            <input
              type="text"
              name='author'
              value={blog.author}
              className={`${style.input}`}
              onChange={handleChange}
              id='tags'
              placeholder='Taha M'
            />
          </div>
          <br />
          <div>
            <label htmlFor="" className={`${style.label} text-black dark:text-white`}>
              Blog Category
            </label>
            <input
              type="text"
              name='category'
              className={`${style.input}`}
              value={blog.category}
              onChange={handleChange}
              id='tags'
              placeholder='Programming'
            />
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
              className={`w-full min-h-[10vh] rounded-lg dark:border-white border-black p-3 border flex items-center justify-center ${dragging ? "bg-blue-500 " : "bg-transparent"}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {
                blog.image ? (
                  <img src={blog.image} alt="" className='max-h-full w-full object-cover rounded-md' />
                ) : (
                  <span className='text-black dark:text-white'>
                    Drag and drop your course thumbnail here
                  </span>
                )}
            </label>
          </div>

          <br />
          <div className='w-full flex items-center justify-end'>
            <input
              type="submit"
              value={loading ? "Submitting..." : "Submit"}
              className={`${style.button}`}
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Blogs;
