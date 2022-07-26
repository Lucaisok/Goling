interface User {
    id: number;
    username: string;
    fist_name: string;
    last_name: string;
    token: string;
    refreshToken: string;
    loggedIn: boolean;
}

interface SignupResponse {
    existing_username?: object;
    id?: string;
    token?: string;
    refresh_token?: string;
}