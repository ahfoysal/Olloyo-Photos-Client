import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://olloyophotos.onrender.com/api/v1',
    // prepareHeaders: (headers, {getState}) => {
    //   const {auth :{
    //     accessToken
    //   } } = getState()
    //   headers.set('Authorization',  accessToken)
    //   console.log(accessToken, 's')
    //   return headers
    // }
  }),

  tagTypes: ['photos'],

  endpoints: () => ({}),
});
