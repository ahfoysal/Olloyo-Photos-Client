import { api } from '@/redux/api/apiSlice';

const collectionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchPhotos: builder.query({
      query: () => {
        return { url: `/photos` };
      },
      providesTags: ['photos'],
    }),
    uploadPhoto: builder.mutation({
      query: (data) => ({
        url: `/photos`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['photos'],
    }),
    deletePhotos: builder.mutation({
      query: (data) => ({
        url: `/photos`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['photos'],
    }),
  }),
});

export const {
  useFetchPhotosQuery,
  useUploadPhotoMutation,
  useDeletePhotosMutation,
} = collectionApi;
