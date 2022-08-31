import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Signin from '../screens/Signin';
import ResetPassword from '../screens/ResetPassword';

const Stack = createNativeStackNavigator();

export default function AuthenticationNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signin" component={Signin} />
                <Stack.Screen name="Reset_Password" component={ResetPassword} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}