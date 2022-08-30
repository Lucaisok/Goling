import React from "react";
import { Text } from "@react-native-material/core";
import { View, SafeAreaView } from "react-native";
import { useSelector } from 'react-redux';
import { RootState } from "../store/store";
import Logout from "../components/Logout";
import TestCall from "../components/TestCall";

export default function Home() {
    const user = useSelector((state: RootState) => state.user);

    return (
        <SafeAreaView>
            <View>
                <Text>Welcome {user.first_name} {user.last_name}</Text>
                <Text>Your username is: {user.username}</Text>
                <Text>Your Id is: {user.id}</Text>
            </View>
            <TestCall />
            <Logout />
        </SafeAreaView>
    );
}