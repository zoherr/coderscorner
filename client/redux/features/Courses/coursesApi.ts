import { apiSlice } from "../Api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        createCourse: builder.mutation({
            query: (data) => ({
                url: "create-course",
                method: 'POST',
                body: data,
                credentials: "include" as const
                
            })
        }),
        getAllCourse: builder.query({
            query: () => ({
                url: "get-all-courses",
                method: 'GET',
                credentials: "include" as const
            })
        }),
        deleteCourse: builder.mutation({
            query: (id) => ({
                url: `delete-course/${id}`,
                method: 'DELETE',
                credentials: "include" as const
            })
        }),
        getUserAllCourse: builder.query({
            query: () => ({
                url: "get-courses",
                method: 'GET',
                credentials: "include" as const
            })
        }),
        getCourseDetails: builder.query({
            query: (id) => ({
                url: `/get-course/${id}`,
                method: 'GET',
                credentials: "include" as const
            })
        }),
        getCourseContent: builder.query({
            query: (id) => ({
                url: `/get-course-content/${id}`,
                method: 'GET',
                credentials: "include" as const
            })
        }),
        editCourse: builder.mutation({
            query: ({data,id}) => ({
                url: `/edit-course/${id}`,
                method: 'PUT',
                body: data,
                credentials: "include" as const
            })
        }),
    })
})

export const {useCreateCourseMutation, useGetAllCourseQuery,useDeleteCourseMutation,useGetUserAllCourseQuery,useGetCourseDetailsQuery,useGetCourseContentQuery,useEditCourseMutation} = courseApi