import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InterfaceProject } from "../../models/Project/Project.interface";

type InitialState = {
  project: InterfaceProject | undefined;
  projectList: Array<InterfaceProject> | undefined;
};

const initialState: InitialState = {
  project: undefined,
  projectList: undefined,
};

const projectSlice = createSlice({
  name: "projectSlice",
  initialState: initialState,
  reducers: {
    putProjectDetail: (state, action: PayloadAction<InterfaceProject>) => {
      state.project = action.payload;
    },
    updateProjectList: (
      state,
      action: PayloadAction<Array<InterfaceProject>>
    ) => {
      state.projectList = action.payload;
    },
  },
});

export const projectActions = projectSlice.actions;

const projectReducer = projectSlice.reducer;

export default projectReducer;
