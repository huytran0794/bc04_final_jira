/* import packages */
import { configureStore } from "@reduxjs/toolkit";

import generalReducer from "../slice/generalSlice";
import userReducer from "../slice/userSlice";
import spinnerReducer from "../slice/spinnerSlice";
import projectReducer from "../slice/projectSlice";
import projectCategoryReducer from "../slice/projectCategorySlice";
import taskReducer from "../slice/taskSlice";
import modalReducer from "../slice/modalSlice";

const store = configureStore({
  reducer: {
    userReducer,
    projectReducer,
    spinnerReducer,
    generalReducer,
    projectCategoryReducer,
    taskReducer,
    modalReducer,
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
