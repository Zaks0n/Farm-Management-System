import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {farmer: null, token: null},
    reducers: {
        setCerdentials: (state, action) => {
            const { farmer, accessToken } = action.payload;
            state.farmer = farmer;
            state.token = accessToken;
        },
        logout: (state, action) => {
            state.farmer = null;
            state.token = null;
        },
    },
});

export const { setCerdentials, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentFarmer = (state) => state.auth.farmer;
export const selectCurrentToken = (state) => state.auth.accessToken;