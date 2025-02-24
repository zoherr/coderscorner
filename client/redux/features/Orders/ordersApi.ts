import { apiSlice } from "../Api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => ({
                url: 'get-orders',
                method: 'GET',
                credentials: "include" as const
            })
        }),
        getStripePublishableKey: builder.query({
            query: () => ({
                url: `payment/stripepublishablekey`,
                method: 'GET',
                credentials: "include" as const
            })
        }),
        createPaymentIntent: builder.mutation({
            query: (amount) => ({
                url: `payment`,
                method: 'POST',
                body:{
                    amount
                },
                credentials: "include" as const
            })
        }),
        createOrders: builder.mutation({
            query: ({courseId,payment_info}) => ({
                url: `create-order`,
                method: 'POST',
                body:{
                    courseId,payment_info
                },
                credentials: "include" as const
            })
        }),
        createOrderfailed: builder.mutation({
            query: (courseId) => ({
                url: `create-order-failed`,
                method: 'POST',
                body:{
                    courseId
                },
                credentials: "include" as const
            })
        }),
        getAllOrdersFailed: builder.query({
            query: () => ({
                url: 'get-orders-failed',
                method: 'GET',
                credentials: "include" as const
            })
        }),
        deleteOrderFailed: builder.mutation({
            query: (id) => ({
                url: `delete-order-failed/${id}`,
                method: 'DELETE',
                
                credentials: "include" as const
            })
        }),
    

    })
})

export const { useGetAllOrdersQuery,useGetStripePublishableKeyQuery,useCreatePaymentIntentMutation,useCreateOrdersMutation,useGetAllOrdersFailedQuery,useCreateOrderfailedMutation,useDeleteOrderFailedMutation} = orderApi;