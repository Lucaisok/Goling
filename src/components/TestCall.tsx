import React from "react";
import { View } from "react-native";
import { Button } from "@react-native-material/core";
import getToken from "../utils/getToken";

export default function TestCall() {


    const testCall = async () => {

        try {
            const token = await getToken();

            if (token) {
                console.log("token", token);

            } else {
                console.log("no token");
                // should I log the user out here?
            }

        } catch (err) {
            console.log("err in testCall", err);
        }
    };

    return (
        <View>
            <Button
                title="Test Call"
                onPress={testCall}
            />
        </View>
    );
}