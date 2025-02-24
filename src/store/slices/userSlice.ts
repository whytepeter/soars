import { UserDetails, CreditCards } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userDetails: UserDetails | null;
  cards: CreditCards[] | [];
}

const initialState: UserState = {
  userDetails: null,
  cards: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set the entire user state
    setUserState: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    // Update  user details
    editUser: (state, action: PayloadAction<Partial<UserDetails>>) => {
      if (state.userDetails) {
        state.userDetails = { ...state.userDetails, ...action.payload };
      }
    },
  },
});

export const { editUser, setUserState } = userSlice.actions;
export default userSlice.reducer;
