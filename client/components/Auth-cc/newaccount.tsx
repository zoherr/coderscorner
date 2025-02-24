import React, { FC, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { style } from '@/app/styles/style'
import { useRegisterMutation } from '@/redux/features/Auth/authApi'
import toast from 'react-hot-toast'
type Props = {
  setRoute: (route: string) => void
}

const schema = Yup.object().shape({
  name: Yup.string().required("Please Enter Name"),
  email: Yup.string().email("Invalid Email").required("Please Enter MailID"),
  password: Yup.string().required("Please Enter Password").min(6, "Password must be at least 6 characters long")
})

const newaccount: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false)
  const [register, { isError, data, isSuccess, error }] = useRegisterMutation();
  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "registration Successful"
      toast.success(message);
      setRoute("verification")
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }
    , [isSuccess, error])

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      const data = {
        name, email, password
      };
      await register(data);
    }
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className='w-full h-full'>
      <img
        className="mx-auto h-8 w-auto m-4"
        src="/images/logo/logoipsum-292.svg"
        alt="Your Company"
      />
      <h1 className={`${style.title}`}>Sign-Up Now!!</h1>

      <form onSubmit={handleSubmit}>
        <div className='mt-6 mb-6'>
          <label className={`${style.label}`} htmlFor='name'>
            Enter Your Name !!
          </label>
          <input type="text" name="" id="name" value={values.name} onChange={handleChange} placeholder='John Bro' className={`${errors.name && touched.name && "border-red-500 "} ${style.input}`} />

          {errors.name && touched.name && (
            <span className="text-red-500 pt-2 block">{errors.name}</span>
          )}
        </div>


        <label className={`${style.label},mt-6`} htmlFor='email'>
          Enter Your Mail !!
        </label>
        <input type="email" name="" id="email" value={values.email} onChange={handleChange} placeholder='example@gmail.com' className={`${errors.email && touched.email && "border-red-500 "} ${style.input}`} />

        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}

        <div className="w-full mt-6 relative mb-1">
          <label className={`${style.label}`} htmlFor='password'>
            Enter Your Password !!
          </label>
          <input type={!show ? "password" : "text"} name="" id="password" value={values.password} onChange={handleChange} placeholder='password!@' className={`${errors.password && touched.password && "border-red-500 "} ${style.input}`} />

          {/* Corrected conditional rendering of eye icons */}
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

        </div>
        {errors.password && touched.password && (
          <span className="text-red-500 pt-2 block">{errors.password}</span>
        )}
        <div className="w-full mt-5">
          <input
            type="submit"
            value="signin"
            className={`${style.button}`}
          />
        </div>
        {/* <br /> */}
        {/* <h5 className='text-center pt-4 text-[18px] text-black  '>Or connect with</h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className="cursor-pointer mr-2" />
          <AiFillGithub size={30} className="cursor-pointer ml-2 text-black" />
        </div> */}
        <h5 className="text-center pt-4 tet-[14px] text-black">
          Already have any account?{""}
          <span className='text-[#2190ff] pl-1 cursor-pointer' onClick={() => setRoute("login")} >
            Login
          </span>
        </h5>

      </form>
    </div>
  )
}

export default newaccount;
