import React, { useState, useEffect } from 'react';
import address from '../config/addressConfig';
import fetchWithInterval from '../utils/fetchWithInterval';
import * as Keychain from 'react-native-keychain';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import AuthenticationNavigator from '../navigation/AuthenticationNavigator';
import AppNavigator from '../navigation/AppNavigator';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../features/user/userSlice';
import getToken from '../utils/getToken';

export default function UserVerification() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.user.loggedIn);
    const [userVerification, setUserVerification] = useState<UserVerification>(null);

    useEffect(() => {
        (async () => {

            if (isLoggedIn) {
                setUserVerification("succeeded");
                return;
            }

            try {

                const credentials = await Keychain.getGenericPassword({ service: "credentials" }) as Credentials;

                if (credentials.username !== "" && credentials.password !== "") {

                    const token = await getToken();

                    if (token) {
                        // here we check if the token or refreshToken saved on the device is still valid, if not we log the user out

                        const serverCall = () => {
                            return fetch(address + "/login", {
                                method: 'POST',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    username: credentials.username, password: credentials.password
                                })
                            });
                        };

                        const data = await fetchWithInterval(serverCall) as LoginResponse;

                        if (data.id) {
                            await Keychain.setGenericPassword(data.token, data.refresh_token, { service: "tokens" });
                            dispatch(userLoggedIn({ id: data.id, username: credentials.username, first_name: data.first_name, last_name: data.last_name }));
                            setUserVerification("succeeded");

                        } else {
                            setUserVerification("failed");
                        }

                    } else {
                        setUserVerification("failed");
                    }

                } else {
                    setUserVerification("failed");
                }

            } catch (err) {
                console.log("err in UserVerification", err);
                setUserVerification('failed');
            }

        })();

    }, []);

    if (userVerification === "succeeded") {
        return <AppNavigator />;

    } else if (userVerification === "failed") {
        return <AuthenticationNavigator />;

    } else {
        // splash screen!
        return null;
    }
}