import React, { useEffect } from "react";
import { Button, Text } from "@react-native-material/core";
import { View, StyleSheet, Keyboard, KeyboardAvoidingView, SafeAreaView } from "react-native";
import { useSelector } from 'react-redux';
import { RootState } from "../store/store";
import { useDispatch } from 'react-redux';
import { userLoggedOut } from "../features/user/userSlice";

export default function Home() {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(userLoggedOut());
    };

    return (
        <SafeAreaView>
            <View>
                <Text>Welcome {user.first_name} {user.last_name}</Text>
                <Text>Your username is: {user.username}</Text>
                <Text>Your Id is: {user.id}</Text>
            </View>
            <View>
                <Button
                    title="Logout"
                    onPress={logout}
                />
            </View>
        </SafeAreaView>
    );
}