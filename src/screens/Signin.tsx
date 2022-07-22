import React from 'react';
import { View, Button } from "react-native";

export default function Signin({ navigation }: { navigation: any; }) {
    return (
        <View>
            <Button
                title="Login"
                onPress={() =>
                    navigation.navigate('Login')
                }
            />
        </View>
    );
}