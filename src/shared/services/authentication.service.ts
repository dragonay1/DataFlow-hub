import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const authenticationService = createApi({
    reducerPath: 'authenticationService',
    baseQuery: fetchBaseQuery({
        //TODO agregar variable de entorno
        baseUrl: 'http://localhost:5285/api',
        prepareHeaders: headers => {
            headers.set('Accept', '*/*');
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        // TODO agregar tipado
        postLogin: builder.mutation({
            query: body => ({
                //http://localhost:5285/api/auth/login
                url: '/auth/login',
                method: 'POST',
                body
            })
        })
    }),
})

export const { usePostLoginMutation } = authenticationService;