import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    id: string,
    username: string;
    first_name: string;
    last_name: string,
    loggedIn: boolean;
}

const initialState: UserState = {
    id: "",
    username: "",
    first_name: "",
    last_name: "",
    loggedIn: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userLoggedIn(state, action: PayloadAction<UserState>) {
            const { id, username, first_name, last_name, loggedIn } = action.payload;
            state.id = id;
            state.username = username;
            state.first_name = first_name;
            state.last_name = last_name;
            state.loggedIn = loggedIn;
        },
        userLoggedOut(state) {
            state.id = "";
            state.username = "";
            state.first_name = "";
            state.last_name = "";
            state.loggedIn = false;
        },
    }
});

export const { userLoggedIn, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;