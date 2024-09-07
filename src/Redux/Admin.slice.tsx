import { createSlice } from "@reduxjs/toolkit";

const Admin = createSlice({
    name: 'admin',
    initialState: {
        admin: undefined,
        users: undefined,

    },
    reducers: {
        add_admin(state, action) {
            state.admin = action.payload;
        },
        add_users(state, action) {
            state.users = action.payload;
        },
       
    }

})
export default Admin.reducer;
export const { add_admin, add_users} = Admin.actions;