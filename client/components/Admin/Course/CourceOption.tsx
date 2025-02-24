import React, { FC } from 'react'
import { IoMdCheckmark } from 'react-icons/io'

type Props = {
    active: number;
    setActive: (active: number) => void;

}

const CourceOption: FC<Props> = ({ active, setActive }) => {
    const options = [
        "Course Information",
        "Course Data",
        "Course Content",
        "Course Preview"
    ]
    return (

        <div>
            {options.map((option: any, index: number) => (

                <div key={index} className={`w-full flex py-5`} >
                    <div className={`w-[35px] h-[35px] rounded-full flex justify-center items-center ${active + 1 > index ? 'bg-blue-500' : "bg-[#384766]"} relative`}>
                        <IoMdCheckmark className='text-[25px] text-black ' />
                        {index !== options.length - 1 && (
                            <div className={`absolute h-[30px] w-1 ${active + 1 > index ? 'bg-blue-500' : "bg-[#4f72ba]"
                                } bottom-[-100%] `}>
                            </div>

                        )
                        }
                    </div>
                    <h5
                        className={`pl-3 ${active === index ? "dark:text-white text-black" : "dark:text-white text-black"}`}
                    >
                        {option}
                    </h5>
                </div>
            )
            )
            }
        </div>
    )
}

export default CourceOption