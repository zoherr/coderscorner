"use client";
import Image from "next/image";
import { useState } from "react";

const Hero = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="center-container pb-20 pt-35 md:pt-40 text-center xl:pb-25 xl:pt-46">
        <div className="center-content px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center lg:gap-8 ">
            <div className="text-center center-content">
              <h4 className="mb-4.5 text-lg font-medium text-black dark:text-white subHeader_label">
                🔥 Learn & become the Top 1% software developer
              </h4>
              <h1 className="mt-[50px]  text-[55px]  text-black dark:text-white fontmono">
                We only <span className="text-[#24CFA6]">teach</span>   what we are really
              </h1>
              <h1 className="mb-[50px] mt-10 text-[55px]  text-black dark:text-white fontmono">
                really good at.
              </h1>
              <p className="subHeader_label">
                Elevate your programming skills, solve challenges, and unlock the world of coding possibilities.
              </p>


              <button
                aria-label="get started button"
                className="subHeader_label mt-10 rounded-full  px-7.5 py-2.5 text-black duration-300 ease-in-out hover:bg-blackho bg-[#24CFA6]  "
              >
                Check Courses-Make an Impact
              </button>

            </div>

            {/* <div className="animate_right hidden md:w-1/2 lg:block">
              <div className="relative 2xl:-mr-7.5">
                <Image
                  src="/images/shape/shape-01.png"
                  alt="shape"
                  width={46}
                  height={246}
                  className="absolute -left-11.5 top-0"
                /> 
                <Image
                  src="/images/shape/shape-02.svg"
                  alt="shape"
                  width={36.9}
                  height={36.7}
                  className="absolute bottom-0 right-0 z-10"
                />
                <Image
                  src="/images/shape/shape-03.svg"
                  alt="shape"
                  width={21.64}
                  height={21.66}
                  className="absolute -right-6.5 bottom-0 z-1"
                />
                <div className=" relative aspect-[700/444] w-full">
                  <Image
                    className=" dark:hidden"
                    src="/images/hero/hero-dark.png "
                    alt="Hero"
                    fill
                  />
                  <Image
                    className="hidden  dark:block"
                    src="/images/hero/hero-dark.png"
                    alt="Hero"
                    fill
                  />
                </div>
              </div>
            </div> */}

          </div>

        </div>
      </section>
    </>
  );
};

export default Hero;
