import { createSlice } from "@reduxjs/toolkit";
import appApi from "../services/appApi";

export const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addNotifications: (state, { payload }) => {
            if (state.newMessages[payload]) {
                state.newMessages[payload] = state.newMessages[payload] + 1;
            } else {
                state.newMessages[payload] = 1;
            }
        },
        resetNotifications: (state, { payload }) => {
            delete state.newMessages[payload];
        },
    },

    extraReducers: (builder) => {
        // save user after signup
        // save user after signup
        builder.addMatcher(appApi.endpoints.signupUser.matchFulfilled, (state, { payload }) => payload);
        // save user after login
        builder.addMatcher(appApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => payload);
        // save user after update
        builder.addMatcher(appApi.endpoints.updateUser.matchFulfilled, (state, { payload }) => payload);
        // save user uploading user profile
        builder.addMatcher(appApi.endpoints.uploadUserPicture.matchFulfilled, (state, { payload }) => payload);
        // remove user after logout
        builder.addMatcher(appApi.endpoints.logoutUser.matchFulfilled, () => null);
        
        builder.addMatcher(appApi.endpoints.getUser.matchFulfilled, (state, { payload }) => payload || []);
    },
});

export const { addNotifications, resetNotifications } = userSlice.actions;
export default userSlice.reducer;