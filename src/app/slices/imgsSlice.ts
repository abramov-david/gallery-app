import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface imgItem {
  imgItem: File;
  id: number;
}

interface imgs {
  preview: imgItem[];
  gallery: imgItem[];
  curImg: imgItem[];
}

const initialState: imgs = {
  preview: [],
  gallery: [],
  curImg: [],
};

export const imgsSlice = createSlice({
  name: "userImgs",
  initialState,
  reducers: {
    previewImgs: (state, action: PayloadAction<imgItem[]>) => {
      state.preview = action.payload;
    },
    cleanPreview: (state) => {
      state.preview = [];
    },
    addToGallery: (state, action: PayloadAction<imgItem[]>) => {
      state.gallery = [...state.gallery, ...action.payload];
    },
    showCurImg: (state, action: PayloadAction<Number>) => {
      const filteredArray = state.gallery.filter(
        (item) => item.id === action.payload
      );
      state.curImg = filteredArray;
    },
    updateCurImage: (state, action: PayloadAction<imgItem>) => {
      const curUpdated = state.gallery.filter(
        (item) => item.id === action.payload.id
      );
      let withoutCurUpdated = state.gallery.filter(
        (item) => item.id !== action.payload.id
      );
      state.gallery = [...withoutCurUpdated, action.payload];
    },
  },
});

export const {
  previewImgs,
  addToGallery,
  cleanPreview,
  showCurImg,
  updateCurImage,
} = imgsSlice.actions;

export const imgsArr = (state: RootState) => state.getImgs.preview;

export default imgsSlice.reducer;
