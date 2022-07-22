import React from 'react';
import { View, Button } from "react-native";

export default function Login({ navigation }: { navigation: any; }) {
    return (
        <View>
            <Button
                title="Signin"
                onPress={() =>
                    navigation.navigate('Signin')
                }
            />
        </View>
    );
}