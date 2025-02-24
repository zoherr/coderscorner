import { style } from '@/app/styles/style'
import React, { FC, useEffect, useRef, useState } from 'react'
import toast, { Toast } from 'react-hot-toast'
import { VscWorkspaceTrusted } from 'react-icons/vsc'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { useActivationMutation } from '@/redux/features/Auth/authApi'
import { object } from 'yup'
import { redirect } from 'next/navigation'

type Props = {
    setRoute: (route: string) => void
}

type VerifyNumber = {
    "0": string,
    "1": string,
    "2": string,
    "3": string,
}

const verification: FC<Props> = ({ setRoute }) => {
    const {token} = useSelector((state:any) => state.auth);
    const [activation, {isSuccess,error}] = useActivationMutation();
    const [invalidError, setInvalidError] = useState<boolean>(false);
    useEffect(() => {
        if (isSuccess) {
          toast.success("Account Activated Successfully");
         redirect("/");
        }
        if (error) {
          if ("data" in error) {
            const errorData = error as any;
            toast.error(errorData.data.message);
          } else {
            console.log("An Error occurred", error);
          }
          setInvalidError(true);
        }
      }, [isSuccess, error]);
      
    
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
        0: "",
        1: "",
        2: "",
        3: "",
    })

    const verificationHandler = async () => {
        const verificationNumber= Object.values(verifyNumber).join("");
        if (verificationNumber.length !==4  ){
            setInvalidError(true);
            return
        }
        await activation({
            activation_Token : token,
            activation_Code : verificationNumber

        })
     }

    const handleInputChange = (index: number, value: string) => {
        setInvalidError(false);
        const newVerifyNumber = { ...verifyNumber, [index]: value };
        setVerifyNumber(newVerifyNumber);
        if (value === '' && index > 0) {
            inputRefs[index - 1].current?.focus();
        } else if (value.length === 1 && index < 3) {
            inputRefs[index + 1].current?.focus();
        }
    }

    return (
        <div>
            <h1 className={`${style.title}`}>Verify Your Account</h1>
            <div className="w-full flex items-center justify-center mt-4 mb-7">
                <div className='flex items-center justify-center mb-'>
                    <Image
                        src="/images/3d/lock-dynamic-color.png"
                        alt="logo"
                        width={80}
                        height={80}
                        className="mt-2 w-[100px] h-[100px] hidden dark:block"
                    />
                    <Image
                        src="/images/3d/lock-dynamic-premium.png"
                        alt="logo"
                        width={80}
                        height={80}
                        className="mt-2 w-[100px] h-[100px] dark:hidden"
                    />
                </div>
                <br /><br /><br />
            </div>
            <div className="1110px:w-[70%] m-auto flex items-center justify-around">
                {Object.keys(verifyNumber).map((key, index) => (
                    <input
                        type="number"
                        key={key}
                        ref={inputRefs[index]}
                        className={`w-[60px] h-[60px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black  justify-center text-[18px] outline-none text-center ${invalidError ? "shake border-red-500" : " border-black"}`}
                        placeholder=''
                        maxLength={1}
                        value={verifyNumber[key as keyof VerifyNumber]}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                ))}

            </div>
            <br />

            <div className='w-full flex justify-center'>
                <button
                    className={`${style.buttons}`}
                    onClick={verificationHandler}
                >
                    Verify Now
                </button></div>
            <br />
            <h5 className='text-center pt-4 text-[18px] text-black '>
                Go back to Sign in ?     <span className='text-[#2190ff] pl-1 cursor-pointer' onClick={() => setRoute("login")} >
                    Sign up
                </span>
            </h5>
        </div>
    )
}

export default verification
