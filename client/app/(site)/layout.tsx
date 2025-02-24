'use client'
import React, { FC, useEffect, useState } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Lines from "@/components/Lines";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "../globals.css";
const inter = Inter({ subsets: ["latin"] });
import { Providers } from "../provider";
import { SessionProvider } from "next-auth/react";

import ToasterContext from "../context/ToastContext";
import toast, { Toaster } from "react-hot-toast";
import PreLoader from "@/components/Loader/loader";

interface RootLayoutProps {
  children: React.ReactNode;
  /* Define any additional props you want to pass */
}

const RootLayout: FC<RootLayoutProps> = ({
  children,

}: RootLayoutProps) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("login")
  const [isScreenshotDetected, setIsScreenshotDetected] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab is hidden, might be taking a screenshot
        setIsScreenshotDetected(true);
        fetch('/api/screenshot-detected', { method: 'POST' })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error('Error logging screenshot detection:', error));
       
      } else {
        setIsScreenshotDetected(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
   

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
   

    };
  }, []);
  return (
    <html lang="en" suppressHydrationWarning>

      <body className={`dark:bg-black ${inter.className}`}>
        <Providers>
          <SessionProvider>
            <ThemeProvider enableSystem={false} attribute="class" defaultTheme="light">

              <Lines />
              <Header open={open} setOpen={setOpen} activeItem={activeItem} route={route} setRoute={setRoute} />
              <ToasterContext />
              
              {children}
              <Toaster position="bottom-center" reverseOrder={false} />
              {/* <Footer /> */}
              <ScrollToTop />
            </ThemeProvider></SessionProvider></Providers>

      </body>
    </html>
  );
};

export default RootLayout;
