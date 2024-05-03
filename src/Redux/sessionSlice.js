import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userlist: [],
  userdetail: [],
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setUserlist(state, action) {
      state.userlist = action.payload;
    },
    Setuser(state, action) {
      state.userlist = action.payload;
    },
  },
});

export const { setUserlist, Setuser } = counterSlice.actions;

const store = configureStore({
  reducer: { counterSlice: counterSlice.reducer },
});

export default store;
