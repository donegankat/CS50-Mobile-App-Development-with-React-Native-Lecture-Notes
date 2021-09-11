/**
 * Switch navigation no longer exists in version 5+ of react-navigation, so this doesn't actually work.
 */

import { createSwitchNavigator } from "@react-navigation/native";
import React from "react";
import { Button } from "react-native";

class ScreenComponentOne extends React.Component {
	render() {
		return (
			<Button
				title="Go to 2"
				onPress={() => this.props.navigation.navigate(RouteNameTwo)}
			/>
		);
	}
}

class ScreenComponentTwo extends React.Component {
	render() {
		return (
			<Button
				title="Go to 1"
				onPress={() => this.props.navigation.navigate(RouteNameOne)}
			/>
		);
	}
}

const MySwitchNavigator = createSwitchNavigator({
	RouteNameOne: ScreenComponentOne,
	RouteNameTwo: ScreenComponentTwo,
});

export default MySwitchNavigator;
