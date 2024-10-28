import { createSlice } from "@reduxjs/toolkit";

const Admin = createSlice({
  name: "admin",
  initialState: {
    admin: undefined,
    users: undefined,
    petition: undefined,
  },
  reducers: {
    add_admin(state, action) {
      state.admin = action.payload.admin;
      state.petition = action.payload.petition;
    },
    add_users(state, action) {
      state.users = action.payload;
    },
    update_petition(state, action) {
      console.log(state.petition);
      console.log(action.payload);
      state.petition.total_amount = action.payload;
    },
  },
});
export default Admin.reducer;
export const { add_admin, add_users, update_petition } = Admin.actions;
