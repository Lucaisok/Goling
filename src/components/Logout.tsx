import React from "react";
import { View } from "react-native";
import { Button } from "@react-native-material/core";
import { useSelector } from 'react-redux';
import { RootState } from "../store/store";
import { useDispatch } from 'react-redux';
import { userLoggedOut } from "../features/user/userSlice";
import * as Keychain from 'react-native-keychain';

export default function Logout() {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const logout = async () => {
        await Keychain.setGenericPassword("", "");
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