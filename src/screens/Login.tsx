import React, { useState } from 'react';
import { View, StyleSheet, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { Text, TextInput, Button } from "@react-native-material/core";
import address from '../config/addressConfig';
import fetchWithInterval from '../utils/fetchWithInterval';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../features/user/userSlice';
import Spinner from '../components/Spinner';
import * as Keychain from 'react-native-keychain';

export default function Login({ navigation }: { navigation: any; }) {
    const [userInput, setUserInput] = useState({ username: '', password: '' });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const updateUsername = (username: string) => {
        setError("");
        setUserInput({ ...userInput, username });
    };

    const updatePassword = (password: string) => {
        setError("");
        setUserInput({ ...userInput, password });
    };

    const login = async () => {
        Keyboard.dismiss();
        if (userInput.username !== "" && userInput.password !== "") {
            setLoading(true);
            const username = userInput.username.trim();
            const password = userInput.password.trim();

            try {

                const serverCall = () => {
                    return fetch(address + "/login", {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username, password
                        })
                    });
                };

                const data = await fetchWithInterval(serverCall) as LoginResponse;

                if (data.id) {
                    await Keychain.setGenericPassword(username, password, { service: "credentials" });
                    await Keychain.setGenericPassword(data.token, data.refresh_token, { service: "tokens" });

                    setUserInput({ username: '', password: '' });
                    dispatch(userLoggedIn({ id: data.id, username, first_name: data.first_name, last_name: data.last_name }));

                } else if (data.wrong_username) {
                    setError("This username does not exist, please try again");

                } else if (data.wrong_password) {
                    setError("Wrong password, please try again");

                } else {
                    setError("Server connection error, please try again");
                }

            } catch (err) {
                setError("Server connection error, please try again");
                console.log("error in login()", err);

            } finally {
                setLoading(false);
            }

        } else {
            setError(userInput.username !== "" ?
                "Please insert your password" : "Please insert a username");
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            {loading &&
                <Spinner />}
            <View style={styles.titleContainer}>
                <Text variant="h3">Goling</Text>
            </View>
            <View style={styles.formContainer}>
                {error &&
                    <Text variant="subtitle1" style={styles.error}>{error}</Text>}
                <TextInput
                    label="Username"
                    variant="outlined"
                    value={userInput.username}
                    onChangeText={updateUsername}
                />
                <TextInput
                    label="Password"
                    variant="outlined"
                    value={userInput.password}
                    onChangeText={updatePassword}
                />
                <Button
                    title="Login"
                    onPress={login}
                />
                <View style={styles.textContainer}>
                    <Text variant="subtitle1">Not a member yet ?</Text>
                    <Button variant="text"
                        title="JOIN"
                        compact
                        onPress={() =>
                            navigation.navigate('Signin')
                        } />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    titleContainer: {
        width: "70%",
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    formContainer: {
        width: "70%",
        flex: 2,
    },
    textContainer: {
        marginTop: 10,
        width: "70%",
        display: "flex",
        flexDirection: "row",
        alignItems: "baseline",
    },
    error: {
        color: "red",
        marginBottom: 10
    }
});