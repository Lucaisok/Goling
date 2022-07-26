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

                const credentials = await Keychain.getGenericPassword() as Credentials;

                if (credentials.username !== "" && credentials.password !== "") {

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
                        dispatch(userLoggedIn({ id: data.id, username: credentials.username, first_name: data.first_name, last_name: data.last_name, token: data.token, refresh_token: data.refresh_token }));
                        setUserVerification("succeeded");

                    } else {
                        setUserVerification("failed");
                    }
                } else {
                    setUserVerification("failed");
                }

            } catch (err) {
                console.log("err in UserVerification", err);
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