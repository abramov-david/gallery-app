import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Imodal {
  isModal: boolean;
}

const initialState: Imodal = {
  isModal: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state) {
      state.isModal = true;
    },
    closeModal(state) {
      state.isModal = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const isModal = (state: RootState) => state.modal.isModal;

export default modalSlice.reducer;
