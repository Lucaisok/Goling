import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: "",
    username: "",
    first_name: "",
    last_name: "",
    token: "",
    refresh_token: "",
    loggedIn: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userLoggedIn(state, action) {
            const { id, username, first_name, last_name, token, refresh_token } = action.payload;
            state.id = id;
            state.username = username;
            state.first_name = first_name;
            state.last_name = last_name;
            state.token = token;
            state.refresh_token = refresh_token;
            state.loggedIn = true;
        },
        userLoggedOut(state) {
            state.id = "";
            state.username = "";
            state.first_name = "";
            state.last_name = "";
            state.token = "";
            state.refresh_token = "";
            state.loggedIn = false;
        }
    }
});

export const { userLoggedIn, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;