import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: "",
    username: "",
    fist_name: "",
    last_name: "",
    token: "",
    refresh_token: ""
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userLoggedIn(state, action) {
            const { id, username, first_name, last_name, token, refresh_token } = action.payload;
            state.id = id;
            state.username = username;
            state.fist_name = first_name;
            state.last_name = last_name;
            state.token = token;
            state.refresh_token = refresh_token;
        }
    }
});

export const { userLoggedIn } = userSlice.actions;

export default userSlice.reducer;