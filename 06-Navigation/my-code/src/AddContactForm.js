import React from "react";
import {
	Button,
	StyleSheet,
	TextInput,
	View,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
	container: {
		//flex: 1,
		backgroundColor: "#fff",
		paddingTop: Constants.statusBarHeight,
		//justifyContent: "center",
	},
	input: {
		borderWidth: 1,
		borderColor: "black",
		minWidth: 100,
		marginTop: 20,
		marginHorizontal: 20,
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 3,
	},
});

export default class AddContactForm extends React.Component {
	state = {
		name: "",
		phone: "",
		isFormValid: false,
	};

	componentDidUpdate(prevProps, prevState) {
		// This check is required to avoid an infinite loop. Without it, componentDidUpdate will trigger validateForm
		// which will trigger componentDidUpdate again in an infinite loop.
		if (
			this.state.name !== prevState.name ||
			this.state.phone !== prevState.phone
		) {
			this.validateForm();
		}
	}

	getHandler = (key) => (val) => {
		this.setState({ [key]: val });
	};

	handleNameChange = this.getHandler("name"); // This will evaluate to: `val => {this.setState({name: val})}`

	handlePhoneChange = (phone) => {
		if (+phone >= 0 && phone.length <= 10) {
			// The `+` tries to cast the object to a number
			this.setState({ phone });
		}
	};

	/**
	 * Callback function called any time the forms are updated.
	 */
	validateForm = () => {
		const names = this.state.name.split(" ");

		// Checking names[1] prevents us from accepting things like "firstname " because the split will cause that string to
		// become an array with length 2: ["firstname", ""]
		// Same with checking names[0] to prevent against " lastname" being accepted
		if (
			+this.state.phone >= 0 &&
			this.state.phone.length === 10 &&
			this.state.name.length >= 3 &&
			names.length >= 2 &&
			names[0] &&
			names[1]
		) {
			return this.setState({ isFormValid: true });
		} else {
			return this.setState({ isFormValid: false });
		}
	};

	handleSubmit = () => {
		if (this.state.isFormValid) {
			this.props.onSubmit(this.state);
		}
	};

	render() {
		return (
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.container}
			>
				<TextInput
					style={styles.input}
					value={this.state.name}
					onChangeText={this.handleNameChange}
					placeholder="Name"
				/>
				<TextInput
					keyboardType="numeric"
					style={styles.input}
					value={this.state.phone}
					onChangeText={this.handlePhoneChange}
					placeholder="Phone"
				/>

				<Button
					title="Submit"
					onPress={this.handleSubmit}
					disabled={!this.state.isFormValid}
				/>
			</KeyboardAvoidingView>
		);
	}
}
