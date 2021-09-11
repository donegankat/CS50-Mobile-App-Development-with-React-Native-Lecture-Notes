import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

function HomeScreen({ navigation }) {
	return (
		<View style={styles.screen}>
			<Button
				title="Go to Profile"
				onPress={() => navigation.navigate("Profile")}
			/>
		</View>
	);
}

class ProfileScreen extends React.Component {
	constructor(props) {
		super(props);

		props.navigation.setOptions({
			headerTitle: "My Profile",
			headerRight: () => (
				<Button title="Press Me" onPress={() => alert("Pressed")} />
			),
			headerLeft: () => (
				<Button title="Settings" onPress={() => props.navigation.navigate("Settings")} />
			)
		});
	}

	render() {
		return (
			<View style={styles.screen}>
				<Button
					title="Go to Notifications"
					onPress={() => this.props.navigation.navigate("Notifications")}
				/>
				<Button
					title="Go back"
					onPress={() => this.props.navigation.goBack()}
				/>
			</View>
		);
	}
}

class NotificationsScreen extends React.Component {
	render() {
		return (
			<View style={styles.screen}>
				<Button
					title="Go to Settings"
					onPress={() => this.props.navigation.navigate("Settings")}
				/>
				<Button
					title="Go back"
					onPress={() => this.props.navigation.goBack()}
				/>
			</View>
		);
	}
}

function SettingsScreen({ navigation }) {
	return (
		<View style={styles.screen}>
			<Button title="Go back" onPress={() => navigation.goBack()} />
		</View>
	);
}

const Stack = createStackNavigator();

function MyStackNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Screen name="Notifications" component={NotificationsScreen} />
			<Stack.Screen name="Profile" component={ProfileScreen} />
			<Stack.Screen name="Settings" component={SettingsScreen} />
		</Stack.Navigator>
	);
}

export default MyStackNavigator;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
