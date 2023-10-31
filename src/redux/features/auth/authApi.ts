import { api } from '@/redux/api/apiSlice';

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `auth/login`,
        method: 'POST',
        body: data,
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: `auth/signup`,
        method: 'POST',
        body: data,
      }),
    }),
    me: builder.query({
      query: () => '/auth/me',
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useMeQuery } = authApi;
