import { apiSlice } from "../Api/apiSlice";

export const formApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFormData: builder.query({
            query: () => ({
                url: 'get-formdata',
                method: 'GET',
                credentials: "include" as const
            })
        }),
        deleteFormData: builder.mutation({
            query: (id) => ({
                url: `delete-formdata/${id}`,
                method: 'DELETE',
                credentials: "include" as const
            })
        })

    })
})

export const {useGetFormDataQuery,useDeleteFormDataMutation } = formApi;