import React, { useState } from 'react';
import { View, StyleSheet, Keyboard, KeyboardAvoidingView } from "react-native";
import { Text, TextInput, Button } from "@react-native-material/core";
import address from '../config/addressConfig';
import fetchWithInterval from '../utils/fetchWithInterval';

export default function Login({ navigation }: { navigation: any; }) {
    const [userInput, setUserInput] = useState({ username: '', password: '' });
    const [error, setError] = useState("");

    const updateUsername = (username: string) => {
        setError("");
        setUserInput({ ...userInput, username });
    };

    const updatePassword = (password: string) => {
        setError("");
        setUserInput({ ...userInput, password });
    };

    const login = () => {
        Keyboard.dismiss();
        if (userInput.username !== "" && userInput.password !== "") {
            const username = userInput.username;
            const password = userInput.password;

            try {

            } catch (err) {
                console.log("error in login()", err);
            }

        } else {
            setError(userInput.username !== "" ?
                "Please insert your password" : "Please insert a username");
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
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