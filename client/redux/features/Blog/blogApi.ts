import { apiSlice } from "../Api/apiSlice";

export const blogApi = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        getAllBlog: builder.query({
            query: () => ({
                url: "get-blogs",
                method: 'GET',
                credentials: "include" as const
            })
        }),
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `delete-blog/${id}`,
                method: 'DELETE',
                credentials: "include" as const
            })
        }),
    
        getBlogDetails: builder.query({
            query: (id) => ({
                url: `/get-blog/${id}`,
                method: 'GET',
                credentials: "include" as const
            })
        }),
     
    })
})

export const {useGetAllBlogQuery,useDeleteBlogMutation,useGetBlogDetailsQuery} = blogApi