import React from "react";
import { StyleSheet, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ContactListScreen from "../screens/ContactListScreen";
import AddContactScreen from "../screens/AddContactScreen";
import ContactDetailsScreen from "../screens/ContactDetailsScreen";
//import SplashScreen from "../screens/SplashScreen";
import AuthContext from "../context/AuthContext";
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();

export default class ContactListNavigator extends React.Component {
    static contextType = AuthContext;

    render() {
        // Moved to tab navigator
        // if (!this.context.isSignedIn) {
        //     return (
        //         <Stack.Navigator>
        //             <Stack.Screen name="Login" component={LoginScreen} />
        //         </Stack.Navigator>
        //     )
        // }

        return (
            <Stack.Navigator initialRouteName="ContactList">
                <Stack.Screen
                    name="ContactList"
                    component={ContactListScreen}
                    options={({ navigation, route }) => ({
                        title: "My Contacts",
                        // headerStyle: {
                        // 	backgroundColor: "#9E9E9E",
                        // },
                        // headerTintColor: "#fff",
                        // headerTitleStyle: {
                        // 	fontWeight: "bold",
                        // },
                        headerRight: () => (
                            <Button title="Add" onPress={() => navigation.navigate("AddContact")} />
                        )
                    })}
                />
                <Stack.Screen
                    name="AddContact"
                    component={AddContactScreen}
                    options={{
                        title: "Add Contact"
                    }}
                />
                <Stack.Screen
                    name="ContactDetails"
                    component={ContactDetailsScreen}
                    options={{
                        title: "Details"
                    }}
                />
            </Stack.Navigator>
        );
    }
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
