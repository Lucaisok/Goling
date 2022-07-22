import React, { useState } from 'react';
import { View, StyleSheet, Keyboard } from "react-native";
import { TextInput, Button, Text } from "@react-native-material/core";
import Spinner from '../components/Spinner';
import address from '../config/addressConfig';

export default function Signin({ navigation }: { navigation: any; }) {
    const [userInput, setUserInput] = useState({ username: '', password: '' });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const updateUsername = (username: string) => {
        setError("");
        setUserInput({ ...userInput, username });
    };

    const updatePassword = (password: string) => {
        setError("");
        setUserInput({ ...userInput, password });
    };

    const signup = () => {
        Keyboard.dismiss();
        if (userInput.username !== "" && userInput.password !== "") {
            setLoading(true);
            const username = userInput.username;
            const password = userInput.password;

            try {

            } catch (err) {
                console.log("error in signup()", err);
            }

        } else {
            setError(userInput.username !== "" ?
                "Please insert your password" : "Please insert a username");
        }
    };

    return (
        <View style={styles.container}>
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
        </View>
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