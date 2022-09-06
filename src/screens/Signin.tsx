import React, { useState } from 'react';
import { View, StyleSheet, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { TextInput, Button, Text } from "@react-native-material/core";
import Spinner from '../components/Spinner';
import address from '../config/addressConfig';
import fetchWithInterval from '../utils/fetchWithInterval';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../features/user/userSlice';
import * as Keychain from 'react-native-keychain';
import validEmail from '../utils/validEmail';

export default function Signin({ navigation }: { navigation: any; }) {
    const [userInput, setUserInput] = useState({ username: '', password: '', first_name: '', last_name: '', email: '' });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const updateUsername = (username: string) => {
        setError("");
        setUserInput({ ...userInput, username });
    };

    const updateFirstName = (first_name: string) => {
        setError("");
        setUserInput({ ...userInput, first_name });
    };

    const updateLastName = (last_name: string) => {
        setError("");
        setUserInput({ ...userInput, last_name });
    };

    const updatePassword = (password: string) => {
        setError("");
        setUserInput({ ...userInput, password });
    };

    const updateEmail = (email: string) => {
        setError("");
        setUserInput({ ...userInput, email });
    };

    const signup = async () => {
        Keyboard.dismiss();
        if (userInput.username !== "" && userInput.password !== "" && userInput.first_name !== "" && userInput.last_name !== "" && userInput.email) {
            const username = userInput.username.trim();
            const password = userInput.password.trim();
            const first_name = userInput.first_name.trim();
            const last_name = userInput.last_name.trim();
            const email = userInput.email.trim();

            if (!validEmail(email)) {
                setError('Please insert a valid email address');

            } else {
                setLoading(true);

                try {
                    const serverCall = () => {
                        return fetch(address + "/signin", {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                username, password, first_name, last_name, email
                            })
                        });
                    };

                    const data = await fetchWithInterval(serverCall) as SignupResponse;

                    if (data.existing_username) {
                        setError("Username already exist, please try again");

                    } else if (data.token && data.refresh_token && data.id) {
                        await Keychain.setGenericPassword(username, password, { service: "credentials" });
                        await Keychain.setGenericPassword(data.token, data.refresh_token, { service: "tokens" });
                        setUserInput({ username: '', password: '', first_name: '', last_name: '', email: '' });
                        dispatch(userLoggedIn({ id: data.id, username, first_name, last_name }));

                    } else {
                        setError("Server connection error, please try again");
                    }

                } catch (err) {
                    console.log("error in signup()", err);
                    setError("Server connection error, please try again");

                } finally {
                    setLoading(false);
                }

            }

        } else {
            setError("Every field is required");
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
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
                    label="First Name"
                    variant="outlined"
                    value={userInput.first_name}
                    onChangeText={updateFirstName}
                />
                <TextInput
                    label="Last Name"
                    variant="outlined"
                    value={userInput.last_name}
                    onChangeText={updateLastName}
                />
                <TextInput
                    label="Email"
                    variant="outlined"
                    value={userInput.email}
                    onChangeText={updateEmail}
                />
                <TextInput
                    label="Password"
                    variant="outlined"
                    value={userInput.password}
                    onChangeText={updatePassword}
                />
                <Button
                    title="Signup"
                    onPress={signup}
                />
                <View style={styles.textContainer}>
                    <Text variant="subtitle1">Already a member ?</Text>
                    <Button variant="text"
                        title="Login"
                        compact
                        onPress={() =>
                            navigation.navigate('Login')
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
        alignItems: "center",
    },
    formContainer: {
        width: "70%",
        flex: 3,
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