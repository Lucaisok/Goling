import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
// import { ActivityIndicator } from "@react-native-material/core";

export default function Spinner() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 10,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    }
});