import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import ContactsContext from "../context/ContactsContext";

export default class ContactDetailsScreen extends React.Component {
    static contextType = ContactsContext;

    constructor(props) {
        super(props);        

        this.state = {
            name: props.route.params.name,
            phone: props.route.params.phone
        }
    }

    componentDidMount() {
        // This update to the navigation options MUST be done in componentDidMount (or possibly componentDidUpdate)
        // rather than the constructor. Otherwise when we have nested navigation like we do in this app, this causes
        // a warning/error because it can't update a component from inside another component.
        // https://github.com/react-navigation/react-navigation/issues/8621
        this.props.navigation.setOptions({
            headerTitle: this.state.name
        });
    }

    goToRandom = () => {
        let randomContact;
        const contacts = this.context.contacts;

        while (!randomContact) {
            const randomIndex = Math.floor(Math.random() * contacts.length);

            if (contacts[randomIndex].name !== this.state.name && contacts[randomIndex].phone !== this.state.phone) {
                randomContact = contacts[randomIndex];
            }
        }

        // Use the following line to continue the stack and navigate to the new random contact details while keeping
        // a history of all contacts visited that will need to be traversed fully in order to go all the way back to
        // the contact list.
        this.props.navigation.push("ContactDetails", {name: randomContact.name, phone: randomContact.phone})

        // Use the following line to replace the current screen with the contact details of the new random contact.
        // In this case, the back button will go directly to the contacts list regardless of how many random contacts
        // the user has navigated to.
        //this.props.navigation.replace("ContactDetails", {name: randomContact.name, phone: randomContact.phone})
    }

    render() {
        return (
            <View>
                <Text>Phone: {this.state.phone}</Text>
                <Button title="Go to random contact" onPress={() => this.goToRandom()} />
            </View>
        )
    }
}