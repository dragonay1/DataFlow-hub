import { fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../store';
import { setIsAuthenticated, updateTokens } from '../../store/slices/authSlice.ts';

const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:5285/api';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authentication.userData.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('Accept', '*/*');
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

let refreshPromise: Promise<boolean> | null = null;

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!refreshPromise) {
      refreshPromise = (async () => {
        const state = api.getState() as RootState;
        const token = state.authentication.userData.token;
        const refreshToken = state.authentication.userData.refreshToken;

        if (token && refreshToken) {
          const refreshResult = await rawBaseQuery(
            {
              url: '/auth/refresh-token',
              method: 'POST',
              body: { token, refreshToken },
            },
            api,
            extraOptions,
          );

          if (refreshResult.data) {
            const payload = (refreshResult.data as any).data ?? refreshResult.data;
            api.dispatch(updateTokens({ token: payload.token, refreshToken: payload.refreshToken }));
            return true;
          }
        }
        api.dispatch(setIsAuthenticated(false));
        return false;
      })();
    }

    const isRefreshed = await refreshPromise;
    refreshPromise = null;

    if (isRefreshed) {
      result = await rawBaseQuery(args, api, extraOptions);
    }
  }

  return result;
};
