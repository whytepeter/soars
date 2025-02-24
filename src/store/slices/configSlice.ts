import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConfigState {
  sidebarCollapsed: boolean;
}

const initialState: ConfigState = {
  sidebarCollapsed: true,
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarState: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarState } = configSlice.actions;
export default configSlice.reducer;
