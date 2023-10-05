import { apiSlice } from "../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: 'farmer/auth/login',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
    }),
});

export const { useLoginMutation } = authApiSlice;


 //invalidatesTags: ['auth'],
// logout: builder.mutation({
//     query: () => ({
//         url: '/auth/logout',
//         method: 'POST',
//     }),
//     invalidatesTags: ['auth'],
// }),
// refresh: builder.mutation({
//     query: () => ({
//         url: '/auth/refresh',
//         method: 'POST',
//     }),
//     invalidatesTags: ['auth'],
// }),