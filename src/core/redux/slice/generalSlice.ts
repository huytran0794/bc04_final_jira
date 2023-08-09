import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface interfaceInitialStateGeneralReducer {
  isDrawerOpen: boolean;
  DrawerContent: React.ReactNode;
  // handleSummitDrawer: () => void;
  sidebarCollapse: boolean;
}

const initialState: interfaceInitialStateGeneralReducer = {
  isDrawerOpen: false,
  DrawerContent: null,
  sidebarCollapse: false,
};

const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {
    handleDrawerOpen: (state, action: PayloadAction<React.ReactNode>) => {
      state.DrawerContent = action.payload;
      state.isDrawerOpen = true;
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
    },
    toggleCollapseSidebar: (state) => {
      if (state.sidebarCollapse === true) {
        state.sidebarCollapse = false;
      } else {
        state.sidebarCollapse = true;
      }
    },
    collapseSidebar: (state) => {
      state.sidebarCollapse = true;
    },
  },
});

export const generalActions = generalSlice.actions;

const generalReducer = generalSlice.reducer;

export default generalReducer;
