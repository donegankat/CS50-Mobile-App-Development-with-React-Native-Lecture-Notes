import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ContactListNavigator from "./ContactListNavigator";
import SettingsScreen from "../screens/SettingsScreen";
import AuthContext from "../context/AuthContext";
import LoginScreen from "../screens/LoginScreen";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

// Only used for authentication to lock users out when not logged in
const Stack = createStackNavigator();

export default class TabNavigator extends React.Component {
    static contextType = AuthContext;

    render() {
        if (!this.context.isSignedIn) {
            return (
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={LoginScreen} />
                </Stack.Navigator>
            )
        }

        return (
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={ContactListNavigator}
                    options={{
                        tabBarIcon: ({ focused, tintColor }) => (
                            <Ionicons
                            name={`ios-people${focused ? "" : "-outline"}`}
                            size={25}
                            color={tintColor}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        tabBarIcon: ({ focused, tintColor }) => (
                            <Ionicons
                            name={`ios-options${focused ? "" : "-outline"}`}
                            size={25}
                            color={tintColor}
                            />
                        )
                    }}
                />
            </Tab.Navigator>
        )
    }
}