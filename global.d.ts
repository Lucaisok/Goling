interface User {
    id: number;
    username: string;
    fist_name: string;
    last_name: string;
    token: string;
    refreshToken: string;
}

interface SignupResponse {
    existing_username?: object;
    token?: string;
    refresh_token: string;
}