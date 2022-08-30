import checkToken from "./checkToken";
import createNewToken from "./createNewTokens";
import * as Keychain from 'react-native-keychain';

export default async function getToken() {

    try {
        const tokens = await Keychain.getGenericPassword({ service: "tokens" }) as Credentials;

        if (tokens) {
            const token = tokens.username;
            const refreshToken = tokens.password;

            const validToken = checkToken(token);
            if (validToken) return validToken;

            // If our current token has expired we use our refresh token to create new tokens
            let newToken = await createNewToken(refreshToken);
            if (newToken) return newToken;
        }

    } catch (err) {
        console.log("err in getToken", err);
    }

}