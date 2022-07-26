interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    token: string;
    refreshToken: string;
    loggedIn: boolean;
}

interface SignupResponse {
    existing_username?: object;
    id?: number;
    token?: string;
    refresh_token?: string;
}

interface LoginResponse {
    id: number;
    first_name: string;
    last_name: string;
    token: string;
    refresh_token: string;
    wrong_username: any;
    wrong_password: any;
}

interface Credentials {
    username: string;
    password: string;
}

type UserVerification = "succeeded" | "failed" | null;
