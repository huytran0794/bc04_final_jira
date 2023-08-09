import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModalProps } from "../../models/Task/ModalForm.interface";

type InitialState = {
  modalProps: IModalProps;
};

const initialState: InitialState = {
  modalProps: {
    headerContent: null,
    open: false,
    modalContent: null,
    width: "auto",
    form: null,
    maskClosable: null,
  },
};

const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    setUpModal: (state, action: PayloadAction<IModalProps>) => {
      state.modalProps = action.payload;
      state.modalProps.open = true;
    },
    openModal: (state, action: PayloadAction<React.ReactNode>) => {
      state.modalProps.open = true;
      state.modalProps.modalContent = action.payload;
    },
    closeModal: (state) => {
      state.modalProps.open = false;
    },
  },
});

export const modalActions = modalSlice.actions;

const modalReducer = modalSlice.reducer;

export default modalReducer;
