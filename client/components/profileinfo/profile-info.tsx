import React, { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { style } from '@/app/styles/style'
import { AiOutlineCamera } from 'react-icons/ai'
import { FaUserNinja } from "react-icons/fa";
import { HiOutlineUserCircle } from 'react-icons/hi';
import { useEditProfileMutation, useUpdateAvatarMutation } from '@/redux/features/user/userApi';
import { useLoadUserQuery } from '@/redux/features/Api/apiSlice';
import toast from 'react-hot-toast'

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation()
  const [editProfile, { isSuccess:success, error:updateError }] = useEditProfileMutation()
  const avatarUrl = user.avatar?.url || avatar || 'https://ui-avatars.com/api/?name=Default+User&background=random&length=1';

  const [loadUser,setLoadUser]= useState(false);

  const {} = useLoadUserQuery(undefined,{skip:loadUser? false: true})

  const imageHandler = async (e: any) => {
  const fileReader = new FileReader()
  fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar( avatar)
      }
    };
    fileReader.readAsDataURL(e.target.files[0])

  }


 useEffect(() => {
    if (isSuccess || success) {
      const message ="Profile Upadate Successful"
      toast.success(message);
      setLoadUser(true);
      console.log("success");
    }
    if (error || updateError) {
      console.log(error);
    }
  }, [isSuccess, error,success,updateError])
  

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      await editProfile({
        name:name,
        email:user.email,
      })
    }
  }

  return (
    <>
      <div className='w-full flex justify-center'>
        <div className='relative'>
          <Image
            src={user.avatar || avatar ? user.avatar.url || avatar : 'https://ui-avatars.com/api/?name=Default+User&background=random&length=1'}
            alt="avatar"
            width={150}
            height={150}
            className="w-[150px] h-[150px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
          />

          <input
            type='file'
            name='avatar'
            id='avatar'
            className='hidden'
            onChange={imageHandler}
            accept='image/png, image/jpg, image/jpeg, image/webp'
          />
          <label htmlFor='avatar'>
            <div className='w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer '>
              <AiOutlineCamera size={20} className='z-1' />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className='w-full pl-6 flex justify-center relative'>
        <form onSubmit={handleSubmit}>
          <div className=' m-auto block pb-4 justify-center  w'>
            <div className='w-90'>
              <label htmlFor='name' className='block pb-2'>Name</label>
              <input
                type='text'
                className={`${style.input}  w-full mb-4 800px:mb-0`}
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className='w-90 mt-1'>
              <label htmlFor='name' className='block pb-2'>Email Address:</label>
              <input
                type='text'
                className={`${style.input}  w-full mb-4 800px:mb-0`}
                value={user?.email}
                required
                readOnly
              />
            </div>
            <input
              className={`${style.button}`}
              required
              value="Update"
              type="submit"
            />

          </div>
        </form>
      </div>
    </>
  )
}

export default ProfileInfo