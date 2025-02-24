// All Course
"use client"
import React, { useEffect, useState } from 'react';
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

type Props = {}



const FormData = (props: Props) => {
  const { theme, } = useTheme()
  const [open, setOpen] = useState(false)

  const { isLoading, data, error,refetch } = useGetFormDataQuery({},{refetchOnMountOrArgChange:true});
  const [deleteFormData, { error: updateError, isSuccess }] = useDeleteFormDataMutation()
  const [userID, setUserID] = useState("");

  const handleDelete = async () => {
    const id = userID
    await deleteFormData(id)
  }


  useEffect(() => {

    if (updateError) {
      if ("data" in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message)
      }
    }

    if (isSuccess) {
      refetch()
      toast.success("User Deleted");
      setOpen(!open)
    }

  }, [updateError, isSuccess])

  const columns = [

    { field: "id", headerName: "ID", flex: 0.2 },
    { field: "name", headerName: "Name", flex: 0.3 },
    { field: "email", headerName: "Email", flex: 0.6 },
    { field: "subject", headerName: "Subject", flex: 0.4 },
    { field: "message", headerName: "Message", flex: 0.6 },
    { field: "phone", headerName: "Phone no", flex: 0.3 },
    { field: "created_at", headerName: "Filled At", flex: 0.3 },
    {
      field: "  ",
      headerName: "Delete",
      flex: 0.3,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setUserID(params.row.id);
              }}
            >
              <AiOutlineDelete
                className='text-black dark:text-white'
                size={20}
              />
            </Button>
          </>
        )
      }
    }
  ]

  const rows = (data ? data.formDatas.map((item: any) => ({
    id: item._id,
    name: item.fullName,
    subject: item.subject,
    email: item.email,
    phone: item.phoneNumber,
    message: item.message,
    created_at: format(item.createdAt)
  })) : []) as {  name: string; email: string; created_at: string }[];





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

        {
          open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
            >
              <Box className={`absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white rounded-lg shadow p-4 outline-none`}>
                <br />
                <h1 className={`${style.title}`}>Are you sure?</h1>
                <div className="w-[90%] m-auto">

                  <div className={`${style.button} `}
                    onClick={handleDelete}
                  >
                    Yes
                  </div>
                  <div className={`${style.button} bg-red-600	hover:bg-red-700	mt-2 `}
                    onClick={() => setOpen(!open)}
                  >
                    No
                  </div>
                </div>
              </Box>
            </Modal>
          )
        }
      </Box>
    </div>

  )
}

export default FormData