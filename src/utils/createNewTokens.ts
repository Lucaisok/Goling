import address from "../config/addressConfig";
import fetchWithInterval from '../utils/fetchWithInterval';
import * as Keychain from 'react-native-keychain';

export default async function createNewToken(refreshToken: string) {
    const credentials = await Keychain.getGenericPassword({ service: "credentials" }) as Credentials;

    try {
        const serverCall = () => {
            return fetch(address + "/create-new-tokens", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'refreshAuthorization': refreshToken
                },
                body: JSON.stringify({
                    username: credentials.username
                })
            });
        };

        const data = await fetchWithInterval(serverCall) as TokensResponse;

        if (data.token && data.refreshToken) {
            const token = data.token;
            const refreshToken = data.refreshToken;
            await Keychain.setGenericPassword(token, refreshToken, { service: "tokens" });

            return token;
        }

    } catch (err) {
        console.log("err in createNewToken", err);
    }

}