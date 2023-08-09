import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProjectCategory } from "../../models/Project/Project.interface";

type InitialState = {
  projectCategoryArr: IProjectCategory[];
};

const initialState: InitialState = {
  projectCategoryArr: [],
};

const projectCategorySlice = createSlice({
  name: "projectCategorySlice",
  initialState: initialState,
  reducers: {
    getAllProjectCategory: (
      state,
      action: PayloadAction<IProjectCategory[]>
    ) => {
      // console.log(action.payload);
      state.projectCategoryArr = [...action.payload];
    },
  },
});

export const projectCategoryActions = projectCategorySlice.actions;

const projectCategoryReducer = projectCategorySlice.reducer;

export default projectCategoryReducer;
