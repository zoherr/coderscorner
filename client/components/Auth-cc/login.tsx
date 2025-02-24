import React, { FC, useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { style } from '@/app/styles/style'
import { useLoginMutation } from '@/redux/features/Auth/authApi'
import toast from 'react-hot-toast'
import { signIn } from "next-auth/react"

type Props = {
    setRoute: (route: string) => void;
    setOpen: (open: boolean) => void;
}

const schema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Please Enter MailID"),
    password: Yup.string().required("Please Enter Password").min(6, "Password must be at least 6 characters long")
})

const Login: FC<Props> = ({ setRoute, setOpen }) => {
    const [show, setShow] = useState(false)
    const [login, { isSuccess, isError, error }] = useLoginMutation()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
            await login({ email, password })
        }
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("Login Successfully!")
            setOpen(false)
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            }
        }
    }, [isSuccess, error])

    const { errors, touched, values, handleChange, handleSubmit } = formik;

    return (
        <div className='w-full h-full '>
            {/* --------------------------------------- */}

            <img
                className="mx-auto h-8 w-auto m-4"
                src="/images/logo/logoipsum-292.svg"
                alt="Your Company"
            />
            <h1 className={`${style.title}`}>Login to your account</h1>
            <form onSubmit={handleSubmit}> {/* 
                <label className={`${style.label},mt-8 Gilroy-Regular`} htmlFor='email'>
                    Enter Your Mail!!
                </label>
                <input type="email" name="" id="email" value={values.email} onChange={handleChange} placeholder='example@gmail.com' className={`${errors.email && touched.email && "border-red-500 "} ${style.input}`} />

                {errors.email && touched.email && (
                    <span className="text-red-500 pt-2 block">{errors.email}</span>
                )}

                <div className="w-full mt-8 relative mb-1">
                    <label className={`${style.label}`} htmlFor='password'>
                        Enter Your Password!!
                    </label>
                    <input type={!show ? "password" : "text"} name="" id="password" value={values.password} onChange={handleChange} placeholder='password!@' className={`${errors.password && touched.password && "border-red-500 "} ${style.input}`} />

                    {show ? (
                        <AiOutlineEyeInvisible
                            className="absolute bottom-3 right-2 z-10 cursor-pointer"
                            size={20}
                            onClick={() => setShow(false)}
                        />
                    ) : (
                        <AiOutlineEye
                            className="absolute bottom-3 right-2 z-10 cursor-pointer"
                            size={20}
                            onClick={() => setShow(true)}
                        />
                    )}
                    {errors.password && touched.password && (
                        <span className="text-red-500 pt-2 block">{errors.password}</span>
                    )}
                </div>
                <div className="w-full mt-5">
                    <input
                        type="submit"
                        value="Login"
                        className={`${style.button}`}
                    />
                </div> */}
                {/* --------------------------------------- */}
                <div className="flex items-center justify-center my-3">
                    <FcGoogle size={50} className="cursor-pointer mr-4" onClick={() => signIn("google")} />
                    <AiFillGithub size={50} className="cursor-pointer ml-4 text-black" onClick={() => signIn("github")} />
                </div>
                {/* <h5 className="text-center pt-4 tet-[14px] text-black">
                    Not have any account?{""}
                    <span className='text-[#2190ff] pl-1 cursor-pointer' onClick={() => setRoute("Sign-up")} >
                        Sign up
                    </span>
                </h5> */}

            </form>
        </div>
    )
}

export default Login;
