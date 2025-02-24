import React, { FC, useState } from 'react'

type Props = {
    data:any;
    activeVideo?:number;
    setActiveVideo?:any;

}

const CourseContentList:FC<Props> = (props) => {
    const[visibleSection,setVisibleSection] = useState<Set<string>>(new Set<string>())

    // const videoSection: string[] = [
    //     ...new Set<string>(props.data?.map((item:any)=>item.videoSection))
    // ]
  return (
    <div>CourseContentList</div>
  )
}

export default CourseContentList