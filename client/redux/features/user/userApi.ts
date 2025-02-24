import { apiSlice } from "../Api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateAvatar: builder.mutation({
            query: (avatar) => ({
                url: 'update-user-avatar',
                method: 'PUT',
                body: { avatar },
                credentials: "include" as const
            })
        }),
        editProfile: builder.mutation({
            query: ({ name, email }) => ({
                url: 'update-user-auth',
                method: 'PUT',
                body: { name, email },
                credentials: "include" as const
            })
        }),
        getAllUser: builder.query({
            query: () => ({
                url: 'get-users',
                method: 'GET',
                credentials: "include" as const
            })
        }),
        updateUserRole: builder.mutation({
            query: ({ email, role }) => ({
                url: 'update-user-role',
                method: 'PUT',
                body: { email, role },
                credentials: "include" as const
            })
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `delete-user/${id}`,
                method: 'DELETE',
                credentials: "include" as const
            })
        })
    })
})

export const { useUpdateAvatarMutation, useEditProfileMutation, useGetAllUserQuery, useUpdateUserRoleMutation,useDeleteUserMutation } = userApi;