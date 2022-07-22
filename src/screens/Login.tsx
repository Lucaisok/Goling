import React from 'react';
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button } from "@react-native-material/core";

export default function Login({ navigation }: { navigation: any; }) {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text variant="h3">Goling</Text>
            </View>
            <View style={styles.formContainer}>
                <TextInput
                    label="Username"
                    variant="outlined"
                />
                <TextInput
                    label="Password"
                    variant="outlined"
                />
                <Button
                    title="Login"
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
        // backgroundColor: "pink",
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
        // justifyContent: "center",
        alignItems: "baseline",
    }
});