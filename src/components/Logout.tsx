import React from "react";
import { View } from "react-native";
import { Button } from "@react-native-material/core";
import { useDispatch } from 'react-redux';
import { userLoggedOut } from "../features/user/userSlice";
import * as Keychain from 'react-native-keychain';

export default function Logout() {
    const dispatch = useDispatch();

    const logout = async () => {
        await Keychain.setGenericPassword("", "", { service: "credentials" });
        await Keychain.setGenericPassword("", "", { service: "tokens" });
        dispatch(userLoggedOut());
    };

    return (
        <View>
            <Button
                title="Logout"
                onPress={logout}
            />
        </View>
    );
}