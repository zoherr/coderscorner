'use client'
import { Metadata } from "next";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Feature from "@/components/Features";
import About from "@/components/About";
import FunFact from "@/components/FunFact";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Blog from "@/components/Blog";
import Course from "@/components/Course"

import Testimonial from "@/components/Testimonial";
import React, { Children, FC, useState } from "react";
import Heading from "../utils/heading";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RootLayout from "./layout";
import Integration from "@/components/Integration";

interface Props {

}
const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route,setRoute] = useState("login")
  const shouldShowNavbar = false;

  
  return (
    <main>

      <Heading
        title="Coder's Corner"
        description="Elevate your programming skills, solve challenges, and unlock the world of coding possibilities.made by SMB innovation"
        keywords="smb innovation,smb innov,zoher rangwala,Zoher Rangwala,Zoher R,Coder's Corner,coder's corner,coder's-corner"
      />

      <Hero />
      {/* <Brands /> */}
      <Feature />
       {/* <About /> */}
       <Integration /> 

      <Course />
      <Blog />
      {/* <FeaturesTab /> 
      <FunFact /> */}
      <CTA />
      <FAQ />
      <Testimonial />
      {/* <Pricing /> */}
      {/* <Contact /> */}
      
      <Footer />

    </main>
  );
}

export default Page;
