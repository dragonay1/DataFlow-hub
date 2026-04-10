import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { LoginValues, AuthResponse } from '../../types/auth.types.ts';

const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:5285/api';

export const authenticationService = createApi({
  reducerPath: 'authenticationService',
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders: headers => {
      headers.set('Accept', '*/*');
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: builder => ({
    postLogin: builder.mutation<AuthResponse, LoginValues>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    postRegister: builder.mutation<void, any>({
      query: body => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
    refreshToken: builder.mutation<AuthResponse, { token: string; refreshToken: string }>({
      query: body => ({
        url: '/auth/refresh-token',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { usePostLoginMutation, usePostRegisterMutation, useRefreshTokenMutation } = authenticationService;
