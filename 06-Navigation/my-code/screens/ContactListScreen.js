import React from "react";
import { View, Button, StyleSheet } from "react-native";
import Constants from "expo-constants";
import SectionListContacts from "../src/SectionListContacts";
import ContactsContext from "../context/ContactsContext";

export default class ContactListScreen extends React.Component {
    static contextType = ContactsContext;

	state = {
		showContacts: true,
	};

	toggleContacts = () => {
		this.setState((prevState) => ({ showContacts: !prevState.showContacts }));
	};

	render() {
		return (
			<View style={styles.container}>
				<Button title="toggle contacts" onPress={this.toggleContacts} />
				{this.state.showContacts && (
					<SectionListContacts contacts={this.context.contacts} onSelectContact={(contact) => {
                        this.props.navigation.navigate("ContactDetails", {name: contact.name, phone: contact.phone})
                    }} />
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingTop: Constants.statusBarHeight,
	},
});
