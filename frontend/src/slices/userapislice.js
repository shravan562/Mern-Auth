import { apiSlice } from "./apislice";
const USER_URL = "/api/users";

export const userApiSice =apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/auth`,
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USER_URL}/logout`,
                method: 'POST',
            }),
        }),
    }),
});
export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = userApiSice;