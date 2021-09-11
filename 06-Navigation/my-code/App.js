import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import contacts, { compareNames } from "./utils/contacts";
import ContactsContext from "./context/ContactsContext";
import AuthContext from './context/AuthContext'

//import MySwitchNavigator from "./navigation/01-switch";
import MyStackNavigator from "./navigation/02-stack";
import ContactListNavigator from "./navigation/ContactListNavigator";
import TabNavigator from "./navigation/TabNavigator";
import { fetchContacts, login } from "./utils/api";

export default class App extends React.Component {
	state = {
		contacts: contacts,
		isSignedIn: false
	};

	componentDidMount() {
		// Version #1:
		// fetch('https://randomuser.me/api/?nat=gb')
		// 	.then(response => response.json())
		// 	// ({results}) destructures the object. Since we're only interested in the response's "results"
		// 	// key, this allows us to easily grab only what we're interested in without needing to use:
		// 	// `contacts: results.results`
		// 	.then(({results}) => this.setState({contacts: results}))
		// 	.catch(err => console.error(err));



		// Version #2:
		// Because `await` is a reserved keyword that can only be used inside of async functions, one way around
		// this is to create an immediately-invoked anonymous function.
		// (async () => {
		// 	const response = await fetch('https://randomuser.me/api/?nat=gb')

		// 	// `{results}` destructures the object returned from `response.json()` which allows us to just
		// 	// grab the object key called "results" from that object which is all we care about.
		// 	const {results} = await response.json();
			
		// 	console.log(results);
		// 	this.setState({contacts: results});
		// })();



		// Version #3:
		// fetchContacts().then(results => this.setState{contacts: results});


		
		// Version #4:
		this.getContactsFromApi();
	}

	getContactsFromApi = async () => {
		const results = await fetchContacts();
		this.setState({contacts: results});
	}

	addContact = (newContact) => {
		this.setState((prevState) => ({
			contacts: [
				...prevState.contacts,
				{
					key: prevState.contacts.length,
					name: newContact.name,
					phone: newContact.phone,
				},
			], // Copy the old values into the new array and append the new contact at the end.
		}));
	};

	successfulSignInCallback = () => {		
		this.setState({
			isSignedIn: true
		})
	}

	render() {
		return (
			<AuthContext.Provider value={{ isSignedIn: this.state.isSignedIn, successfulSignInCallback: this.successfulSignInCallback }}>
				<ContactsContext.Provider
					value={{ contacts: this.state.contacts, addContact: this.addContact }}
				>
					<NavigationContainer>
						{/* <MySwitchNavigator /> */}
						{/* <MyStackNavigator /> */}
						{/* <ContactListNavigator /> */}
						<TabNavigator />
					</NavigationContainer>
				</ContactsContext.Provider>
			</AuthContext.Provider>
		);
	}
}
