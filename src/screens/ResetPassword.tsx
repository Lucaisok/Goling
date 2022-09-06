import React, { useState } from 'react';
import { View, StyleSheet, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { TextInput, Button, Text } from "@react-native-material/core";
import Spinner from '../components/Spinner';
import address from '../config/addressConfig';
import fetchWithInterval from '../utils/fetchWithInterval';
import validEmail from '../utils/validEmail';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

export default function ResetPassword({ navigation }: { navigation: any; }) {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [codeSent, setCodeSent] = useState(true);
    const [code, setCode] = useState('');
    const ref = useBlurOnFulfill({ value: code, cellCount: 5 });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: code,
        setValue: setCode,
    });

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
                        setCodeSent(true);

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

    const submitCode = () => {
        console.log("code", code);
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
                {codeSent &&
                    <View style={styles.root}>
                        <Text style={styles.title}>Insert Code</Text>
                        <CodeField
                            ref={ref}
                            {...props}
                            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                            value={code}
                            onChangeText={setCode}
                            cellCount={5}
                            rootStyle={styles.codeFieldRoot}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            renderCell={({ index, symbol, isFocused }) => (
                                <Text
                                    key={index}
                                    style={[styles.cell, isFocused && styles.focusCell]}
                                    onLayout={getCellOnLayoutHandler(index)}>
                                    {symbol || (isFocused ? <Cursor /> : null)}
                                </Text>
                            )}
                        />
                        <Button
                            title="Submit"
                            onPress={submitCode}
                            style={styles.button}
                        />
                    </View>
                }
                {codeSent &&
                    <View style={styles.textContainer}>
                        <Text variant="subtitle1" style={{ marginRight: 15 }}>No email ?</Text>
                        <Button variant="text"
                            title="Try again"
                            onPress={() =>
                                setCodeSent(false)
                            } />
                    </View>}
                {!codeSent &&
                    <View>
                        <TextInput
                            label="Email"
                            variant="outlined"
                            keyboardType='email-address'
                            value={email}
                            onChangeText={updateEmail}
                        />
                        <Button
                            title="Get Code"
                            onPress={sendEmail}
                        />
                    </View>}
                {!codeSent && <View style={styles.buttonsRow}>
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
    },
    root: {},
    title: { textAlign: 'center', fontSize: 25 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 1,
        borderColor: '#00000030',
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
    button: {
        marginTop: 10
    }
});