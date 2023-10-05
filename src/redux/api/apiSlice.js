import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { setCerdentials, logout } from '../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/v1',
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.accessToken;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
        const refreshResult = await baseQuery('farmer/auth/refresh', api, extraOptions);
        if (refreshResult?.data) {
            const farmer = api.getState().auth.farmer;
            api.dispatch(setCerdentials({...refreshResult.data, farmer}));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }
    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
});