import { style } from '@/app/styles/style';
import React, { FC, useState } from 'react'
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import toast from 'react-hot-toast';


type Props = {
    active: number;
    setActive: (active: number) => void;
    courseContentData: any;
    setCourseContentData: (courseContentData: any) => void;
    handleSubmit: any;
}

const CourseContent: FC<Props> = ({ active, setActive, courseContentData, setCourseContentData, handleSubmit: handleCourseSubmit }) => {
    const [isCollapsed, setIsCollapsed] = useState(
        Array(courseContentData.length).fill(false)
    );

    const [activeSection, serActiveSection] = useState(1);

    const handleSubmit = (e: any) => {
        e.preventDefault();
    }

    const handleAddLink = (index: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].links.push({
            link: "",
            title: "",
        });
        setCourseContentData(updatedData);
    }

    const prevButton = () => {
        setActive(active - 1);
    }

    const handleOption = () => {
        if (
            courseContentData[courseContentData.length - 1].title === "" ||
            courseContentData[courseContentData.length - 1].description === "" ||
            courseContentData[courseContentData.length - 1].videoUrl === "" ||
            courseContentData[courseContentData.length - 1].links[0].title === "" ||
            courseContentData[courseContentData.length - 1].links[0].url === ""
        ) {
            toast.error("Please Fill all the fields First!! ")
        } else {
            setActive(active + 1);
            handleCourseSubmit();
        }

    }

    const newContentHandler = (item: any) => {
        if (item.title === "" || item.description === "" || item.videoUrl === "" || item.links[0].title === "" || item.links[0].url === "") {
            toast.error("Please Fill all the fields First!! ")
        }
        else {
            let newVideoSection = "";
            if (courseContentData.length > 0) {
                const lastVideoSection = courseContentData[courseContentData.length - 1].videoSection;
                if (lastVideoSection) {
                    newVideoSection = lastVideoSection;
                }
            }
            const newContent = {
                videoUrl: "",
                title: "",
                description: "",
                videoSection: newVideoSection,
                links: [
                    {
                        link: "",
                        title: ""
                    }
                ]
            };
            setCourseContentData([...courseContentData, newContent]);

        }
    }



    const handleRemoveLink = (index: number, linkIndex: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].links.splice(linkIndex, 1);
        setCourseContentData(updatedData);
    }

    const handleCollapseToggle = (index: number) => {
        const updatedCollapsed = [...isCollapsed];
        updatedCollapsed[index] = !updatedCollapsed[index];
        setIsCollapsed(updatedCollapsed);
    }

    const addNewSection = () => {
        if (
            courseContentData[courseContentData.length - 1].title === "" ||
            courseContentData[courseContentData.length - 1].description === "" ||
            courseContentData[courseContentData.length - 1].videoUrl === "" ||
            courseContentData[courseContentData.length - 1].links[0].title === "" ||
            courseContentData[courseContentData.length - 1].links[0].url === ""
        ) {
            toast.error("Please Fill all the fields First!! ")
        } else {
            serActiveSection(activeSection + 1);
            const newContent = {
                videoUrl: "",
                title: "",
                description: "",
                videoSection: `untitled Section ${activeSection}`,
                links: [
                    {
                        link: "",
                        title: ""
                    }
                ]
            };
            setCourseContentData([...courseContentData, newContent]);
        }
    }

    return (
        <div className="w-[80%] m-auto mt-14 p-3">
            <form
                onSubmit={handleSubmit}
            >
                {
                    courseContentData?.map((item: any, index: number) => {

                        const showSectionInput = index === 0 || item.videoSection !== courseContentData[index - 1].videoSection;

                        return (
                            <>
                                <div className={`w-full bg-[#cdc8c817] rounded-lg mt-5 p-10 ${showSectionInput ? "mt-0" : "mb-24"}`}>
                                    {
                                        showSectionInput && (
                                            <>
                                                <div className="flex w-full items-center">
                                                    <input type="text"
                                                        className={`text-[20px] ${item.videoSection === "Untitled Section" ? "w-[170px]" : "w-min"} cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                                                        value={item.videoSection}
                                                        onChange={(e) => {
                                                            const updatedData = [...courseContentData];
                                                            updatedData[index].videoSection = e.target.value;
                                                            setCourseContentData(updatedData);
                                                        }}
                                                    />
                                                    <BsPencil className='cursor-pointer dark:text-white text-black' />
                                                </div>
                                                <br />
                                            </>
                                        )
                                    }
                                    <div className='flex w-full items-center justify-between my-0'>
                                        {isCollapsed[index] &&
                                            (item.title &&
                                                <p className='dark:text-white text-black'>
                                                    {index + 1}. {item.title}
                                                </p>
                                            )
                                        }

                                        <div className="flex item-center">
                                            <AiOutlineDelete
                                                className={`dark:text-white text-black text-[20px] mr-2 ${index > 0 ? "cursor-pointer" : "cursor-no-drop"}`}
                                                onClick={() => {
                                                    if (index > 0) {
                                                        const updatedData = [...courseContentData];
                                                        updatedData.splice(index, 1);
                                                        setCourseContentData(updatedData);
                                                    }
                                                }
                                                }
                                            />

                                            <MdOutlineKeyboardArrowDown
                                                fontSize="large"
                                                className='dark:text-white text-black'
                                                style={
                                                    {
                                                        transform: isCollapsed[index] ? "rotate(180deg)" : "rotate(0deg)"
                                                    }
                                                }
                                                onClick={() => handleCollapseToggle(index)}
                                            />
                                        </div>
                                    </div>
                                    {
                                        !isCollapsed[index] && (
                                            <>
                                                <div className='my-3'>
                                                    <label htmlFor="" className={`${style.label} text-black dark:text-white`}>Video Title </label>
                                                    <input type="text"
                                                        placeholder='Project plan'
                                                        className={`${style.input}`}
                                                        value={item.title}
                                                        onChange={(e) => {
                                                            const updatedData = [...courseContentData];
                                                            updatedData[index].title = e.target.value;
                                                            setCourseContentData(updatedData);
                                                        }}
                                                    />
                                                </div>
                                                <br />
                                                <div className='mb-3'>
                                                    <label htmlFor="" className={`${style.label} text-black dark:text-white`}>Video Url </label>
                                                    <input type="text"
                                                        className={`${style.input}`}
                                                        value={item.videoUrl}
                                                        onChange={(e) => {
                                                            const updatedData = [...courseContentData];
                                                            updatedData[index].videoUrl = e.target.value;
                                                            setCourseContentData(updatedData);
                                                        }}
                                                    />
                                                </div>
                                                <br />
                                                <div className='mb-3'>
                                                    <label htmlFor="" className={`${style.label} text-black dark:text-white`}>Video description </label>
                                                    <textarea
                                                        rows={5}
                                                        cols={30}
                                                        className={`${style.input} !h-min py-2`}
                                                        value={item.description}
                                                        onChange={(e) => {
                                                            const updatedData = [...courseContentData];
                                                            updatedData[index].description = e.target.value;
                                                            setCourseContentData(updatedData);
                                                        }}
                                                    />
                                                    <br /><br /><br />
                                                </div>
                                                {
                                                    item?.links.map((link: any, linkIndex: number) => (
                                                        <div className="mb-3 block" >
                                                            <div className="w-full flex items-center justify-between">
                                                                <label htmlFor="" className={`${style.label} text-black dark:text-white `}>
                                                                    Link {linkIndex + 1}
                                                                </label>
                                                                <AiOutlineDelete
                                                                    className={`${linkIndex === 0 ? "cursor-no-drop" : "cursor-pointer"
                                                                        }
                                                                text-black dark:text-white text-[20px] `}
                                                                    onClick={() => linkIndex === 0 ? null : handleRemoveLink(index, linkIndex)}
                                                                />
                                                            </div>
                                                            <input type="text"
                                                                className={`${style.input}`}
                                                                value={link.title}
                                                                placeholder='Source code (Link Title)....'
                                                                onChange={(e) => {
                                                                    const updatedData = [...courseContentData];
                                                                    updatedData[index].links[linkIndex].title = e.target.value;
                                                                    setCourseContentData(updatedData);
                                                                }}
                                                            />
                                                            <input type="text"
                                                                className={`${style.input}`}
                                                                value={link.url}
                                                                placeholder='Source code Url....'
                                                                onChange={(e) => {
                                                                    const updatedData = [...courseContentData];
                                                                    updatedData[index].links[linkIndex].url = e.target.value;
                                                                    setCourseContentData(updatedData);
                                                                }}
                                                            />
                                                        </div>
                                                    ))}

                                                <br />

                                                <div className="inline-block mb-4">
                                                    <p className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                                                        onClick={() => handleAddLink(index)}
                                                    >
                                                        <BsLink45Deg
                                                            className='mr-2'
                                                        />
                                                        Add link
                                                    </p>
                                                </div>

                                            </>
                                        )}

                                    <br /> <br />
                                    {
                                        index === courseContentData.length - 1 && (
                                            <div >
                                                <p className="flex items-center text-[22px] dark:text-white text-black cursor-pointer "
                                                    onClick={(e: any) => newContentHandler(item)}
                                                >
                                                    <AiOutlinePlusCircle
                                                        className='mr-2'
                                                    />
                                                    Add New Content
                                                </p>
                                            </div>
                                        )
                                    }
                                </div>
                            </>
                        )
                    })}
                <br /><br />
                <div
                    className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
                    onClick={() => addNewSection()}
                >
                    <AiOutlinePlusCircle className='mr-2' /> Add New Section
                </div>


                <br />
                <div className='w-full flex items-center justify-between'>
                    <div className={`${style.button} mr-10`} onClick={() => prevButton()}>Prev</div>

                    <div onClick={() => handleOption()} className={`${style.button} ml-10`}>Next</div>
                </div>
            </form>
        </div>
    )
}

export default CourseContent