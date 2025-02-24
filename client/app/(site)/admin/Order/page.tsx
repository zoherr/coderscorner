// All Course
"use client"
import React, { use, useEffect, useState } from 'react';
import { Box, Button, Modal } from '@mui/material';
import { AiOutlineDelete } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import { DataGrid } from '@mui/x-data-grid';
import { MdEditOff } from "react-icons/md";
import { useGetAllCourseQuery } from '@/redux/features/Courses/coursesApi';
import { format } from "timeago.js"
import { useDeleteUserMutation, useGetAllUserQuery } from '@/redux/features/user/userApi';
import { style } from '@/app/styles/style';
import toast from 'react-hot-toast';
import { useDeleteFormDataMutation, useGetFormDataQuery } from '@/redux/features/form/formApi';
import { useGetAllOrdersQuery } from '@/redux/features/Orders/ordersApi';

type Props = {}



const FormData = (props: Props) => {
  const { theme, } = useTheme()
  const [open, setOpen] = useState(false)

  const { isLoading, data, error,refetch } = useGetAllOrdersQuery({},{refetchOnMountOrArgChange:true});
  const [userID, setUserID] = useState("");

 
useEffect(() => {
  refetch()
}, [])



  const columns = [

    { field: "id", headerName: "Order ID", flex: 0.3 },
    { field: "username", headerName: "User Name", flex: 0.2 },
    { field: "useremail", headerName: "User Email", flex: 0.3 },
    { field: "coursename", headerName: "Course Name", flex: 0.3 },
    { field: "courseprice", headerName: "Course Price", flex: 0.2 },
    { field: "created_at", headerName: "Order At", flex: 0.3 },
  
  ]

  const rows = (data ? data.orders.map((item: any) => ({
    id: item._id,
    username: item.userName,
    useremail: item.userEmail,
    coursename: item.courseName,
    courseprice: item.coursePrice,
    created_at: format(item.createdAt)
  })) : []) as {  name: string; email: string; amount:number; created_at: string }[];





  return (
    <div className='mt-[80px] w-[98%]  rounded-lg'>
      <Box m="20px">

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

      </Box>
    </div>

  )
}

export default FormData