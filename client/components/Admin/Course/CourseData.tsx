import { style } from '@/app/styles/style';
import React, { FC, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import toast from 'react-hot-toast';

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
}


const CourseData: FC<Props> = ({ benefits, setBenefits, prerequisites, setPrerequisites, active, setActive }) => {

  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  }

  const handeleAddBenefits = () => {
    setBenefits([...benefits, { title: "" }]);
  }

  const handlePrerequisitesChange = (index: number, value: any) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  }

  const handeleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  }

  const prevButton = () =>{
    setActive(active - 1);
  }

  const handleOption = () => {
    if(benefits[benefits.length - 1]?.title !== "" && prerequisites[prerequisites.length - 1]?.title !== "" ){
      setActive(active + 1);
    }
    else{
      toast.error("Please fill all the fields");
    }
    
  }

  return (
    <div className='w-[80%] m-auto mt-14 block'>
      <div>
        <label htmlFor="email" className={`${style.label} text-[24px] text-black dark:text-white`}>
          What are the course benefits?
        </label>
        <br />
        {
          benefits.map((benefit: any, index: number) => (
            <input 
              type="text"
              key={index}
              className={`${style.input} my-2`}
              name='benefit'
              value={benefit.title}
              // required
              placeholder='You will able to Create Projects..'
              onChange={(e) => handleBenefitChange(index, e.target.value)}
            />
          ))
        }
        <AddCircleIcon 
        className='text-black dark:text-white'
        style={{margin: "10px 0px" , cursor: "pointer", width: "30px"}}
        onClick={handeleAddBenefits}
        />
      </div>
      <br />
      <div>
        <label htmlFor="email" className={`${style.label} text-[24px] text-black dark:text-white`}>
          What are the course prerequisites?
        </label>
        <br />
        {
          prerequisites.map((prerequisites: any, index: number) => (
            <input 
              type="text"
              key={index}
              className={`${style.input} my-2`}
              name='prerequisites'
              value={prerequisites.title}
              // required
              placeholder='You need Basic Knowledge About Programming..'
              onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
            />
          ))
        }
        <AddCircleIcon 
        className='text-black dark:text-white'
        style={{margin: "10px 0px" , cursor: "pointer", width: "30px"}}
        onClick={handeleAddPrerequisites}
        />
      </div>
      
      <br />
      <div className='w-full flex items-center justify-between'>
       <div className={`${style.button} mr-8` } onClick={()=>prevButton()}>Prev</div>

       <div onClick={()=>handleOption()} className={`${style.button} ml-8`}>Next</div>
      </div>
    </div>
  )
}

export default CourseData