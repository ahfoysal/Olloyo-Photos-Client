import { IPhotos } from '@/types/GlobalInterfaces';
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  photos: IPhotos[];
}

const initialState: InitialState = {
  photos: [],
};

const photoSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    addPhoto: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.photos.push(...action.payload);
      } else {
        state.photos.push(action.payload);
      }
    },
    removePhoto: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.photos = state.photos.filter(
          (photo) => !action.payload.some((p: IPhotos) => p._id === photo._id)
        );
      } else {
        state.photos = state.photos.filter(
          (photo) => photo._id !== action.payload._id
        );
      }
    },
    resetPhotos: (state) => {
      state.photos = [];
    },
  },
});

export const { addPhoto, removePhoto, resetPhotos } = photoSlice.actions;

export default photoSlice.reducer;
