import React from "react";
import ContactsContext from "../context/ContactsContext";
import AddContactForm from "../src/AddContactForm";

export default class AddContactScreen extends React.Component {
	static contextType = ContactsContext;

	handleSubmit = (formState) => {
		this.context.addContact(formState);
		this.props.navigation.navigate("ContactList");
	};

	render() {
		return <AddContactForm onSubmit={this.handleSubmit} />;
	}
}
