import React, { useState } from 'react';
import { View, StyleSheet, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { TextInput, Button, Text } from "@react-native-material/core";
import Spinner from '../components/Spinner';
import address from '../config/addressConfig';
import fetchWithInterval from '../utils/fetchWithInterval';
import validEmail from '../utils/validEmail';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../features/user/userSlice';
import * as Keychain from 'react-native-keychain';

export default function ResetPassword({ navigation }: { navigation: any; }) {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState("");

    const updateEmail = (email: string) => {
        setError("");
        setEmail(email);
    };

    const sendEmail = async () => {
        Keyboard.dismiss();
        if (email !== '') {
            email.trim();

            if (!validEmail(email)) {
                setError("Please insert a valid email address");

            } else {
                setLoading(true);

                try {
                    const serverCall = () => {
                        return fetch(address + "/reset-password-email", {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                email
                            })
                        });
                    };

                    const data = await fetchWithInterval(serverCall) as ServerResponse;

                    if (data.success) {
                        setEmail("");
                        setSuccess('An email has been sent to your email address, please click on the link to set a new password.');

                    } else if (data.serverError) {
                        setError('Server Error, please try again');

                    } else {
                        setEmail("");
                        setError('There isn`t any registerd account linked to this email address.');

                    }

                } catch (err) {
                    console.log("error in reset_pwd", err);

                } finally {
                    setLoading(false);
                }

            }

        } else {
            setError('Please enter the email address of your Goling account.');
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
                {success &&
                    <Text variant="subtitle1" style={styles.success}>{success}</Text>}
                {success &&
                    <View style={styles.textContainer}>
                        <Text variant="subtitle1" style={{ marginRight: 15 }}>No email ?</Text>
                        <Button variant="text"
                            title="Try again"
                            onPress={() =>
                                setSuccess("")
                            } />
                    </View>}
                {!success &&
                    <View>
                        <TextInput
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChangeText={updateEmail}
                        />
                        <Button
                            title="Get Code"
                            onPress={sendEmail}
                        />
                    </View>}
                {!success && <View style={styles.buttonsRow}>
                    <Button variant="text"
                        title="Login"
                        compact
                        onPress={() =>
                            navigation.navigate('Login')
                        } />
                    <Text>or</Text>
                    <Button variant="text"
                        title="Signup"
                        compact
                        onPress={() =>
                            navigation.navigate('Signin')
                        } />
                </View>}
            </View>
        </KeyboardAvoidingView >
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
    error: {
        color: "red",
        marginBottom: 10
    },
    success: {
        marginBottom: 10,
        color: "green"
    },
    textContainer: {
        marginTop: 10,
        width: "70%",
        display: "flex",
        flexDirection: "row",
        alignItems: "baseline",
    },
    buttonsRow: {
        marginTop: 10,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "baseline",
        justifyContent: "space-between"
    }
});