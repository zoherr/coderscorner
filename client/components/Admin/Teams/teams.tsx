// All Course
"use client"
import React, { FC, useEffect, useState } from 'react';
import { Box, Button, Modal } from '@mui/material';
import { AiOutlineDelete } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import { DataGrid } from '@mui/x-data-grid';
import { MdEditOff } from "react-icons/md";
import { useGetAllCourseQuery } from '@/redux/features/Courses/coursesApi';
import { format } from "timeago.js"
import { useGetAllUserQuery, useUpdateUserRoleMutation } from '@/redux/features/user/userApi';
import { style } from '@/app/styles/style';
import toast from 'react-hot-toast';

type Props = {
    isTeam: boolean
}



const Teams: FC<Props> = ({ isTeam }) => {
    const { theme, } = useTheme()
    const [active, setActive] = useState(false)
    const [email, setEmail] = useState('');
    const [role, setRole] = useState("admin")
    const [updateUserRole, { error: updateError, isSuccess }] = useUpdateUserRoleMutation()


    const handleSubmit = async () => {
        await updateUserRole({ email, role })
    }

    useEffect(() => {

        if(updateError){

            if("data" in updateError){
                const errorMessage = updateError as any;
                toast.error(errorMessage.data.message)
            }
        }

        if(isSuccess){
            refetch()

            toast.success("User Role Updated");
            setActive(false);
        }

    }, [updateError,isSuccess])


    const { isLoading, data, error,refetch } = useGetAllUserQuery({},{refetchOnMountOrArgChange:true});

    const columns = [

        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "name", headerName: "User Name", flex: 0.5 },
        // { field: "role", headerName: "Role", flex: 0.4 },
        { field: "email", headerName: "Email", flex: 0.7 },
        // { field: "course", headerName: "Courses", flex: 0.4 },
        { field: "created_at", headerName: "Joined At", flex: 0.5 },
       
    ]

    const rows = (data && data.users ? data.users
        .filter((user: any) => user.role === "admin")
        .map((item: any) => ({
            id: item._id,
            name: item.name,
            // role: item.role,
            email: item.email,
            // course: item.courses.length,
            created_at: format(item.createdAt)
        })) : []) as { id: string; name: string; email: string; created_at: string }[];






    return (
        <div className='mt-[10px] w-[98%]  rounded-lg'>
            <Box m="20px">

                <div className=" flex justify-end w-[220px]">
                    <div className={`${style.button} `}
                        onClick={() => setActive(!active)}
                    >
                        Edit Admin
                    </div>
                </div>

                <Box m="40px 0 0 0" height="80vh"
                    sx={{
                        "& .MuiDataGrid-root": {
                            // border: "none",
                            outline: "none",
                        },
                        "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                            color: theme === "dark" ? "#fff" : "#000"
                        },
                        "& .MuiDataGrid-sortIcon": {
                            color: theme === "dark" ? "#fff" : "#000"
                        },
                        "& .MuiDataGrid-row": {
                            color: theme === "dark" ? "#fff" : "#000",
                            borderBottom: theme === "dark" ? "1px solid #fff!important" : "1px solid #ccc!important",
                            // marginBottom: "10px"
                        },
                        "& .MuiTablePagination-root": {
                            color: theme === "dark" ? "#fff" : "#000",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none"
                        },
                        // "& .name-column-cell": {
                        //   color: theme === "dark" ? "#fff" : "#000",
                        // },
                        // "& .MuiDataGrid-columnHeaders": {
                        //   // backgroundColor: theme === "dark" ? "#000" : "#fff",
                        //   // borderBottom: "none",
                        //   color: theme === "dark" ? "#fff" : "#000",
                        // },
                        "& .MuiDataGrid-footerContainer": {
                            backgroundColor: theme === "dark" ? "#" : "#fff",
                            color: theme === "dark" ? "#fff" : "#000",
                            borderBottom: "none"
                        },
                        // "& .MuiDataGrid-virtualScroller": {
                        //   // backgroundColor: theme === "dark" ? "#000" : "#fff",
                        // },
                        "& .MuiCheckbox-root": {
                            color: theme === "dark" ? "#fff" : "#000",
                        },
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `#fff!importamt`
                        }
                    }}
                >
                    <DataGrid checkboxSelection rows={rows} columns={columns} />
                </Box>
                {
                    active &&
                    <Modal
                        open={active}
                        onClose={() => setActive(!active)}
                    >
                        <Box className={`absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white rounded-lg shadow p-4 outline-none`}>
                            <h1 className={`${style.title}`}>Edit Admin</h1>
                            <div className="mt-4">
                                <input type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='zoherr@gmail.com'
                                    className={`${style.input} border border-black`}
                                />
                                <br />
                                <select name="" id=""
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className={`${style.input} border border-black`}
                                >
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                                <br />
                                <div className={`${style.button} `}
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </div>
                            </div>
                        </Box>
                    </Modal>
                }
            </Box>
        </div>

    )
}

export default Teams