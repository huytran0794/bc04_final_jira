import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import {User} from "../../models/User/User.interface";
import { LOCAL_SERVICE } from "../../services/localServ";

type InitialState = {
  user: User;
};

const initialState:InitialState = {
  user: LOCAL_SERVICE.user.get() ||  {},
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    login: (state, action:PayloadAction<User>) => {      
      state.user = action.payload;
    },
    updateProfile: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
