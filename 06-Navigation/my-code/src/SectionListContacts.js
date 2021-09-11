import React from "react";
import { SectionList, Text, View } from "react-native";
import PropTypes from "prop-types";
import Row from "./Row";
import { compareNames } from "../utils/contacts";


const renderSectionHeader = ({ section }) => <Text>{section.title}</Text>;

const SectionListContacts = (props) => {

    const renderItem = ({ item }) => <Row {...item} onSelectContact={props.onSelectContact} />;

	const contactsByLetter = props.contacts.reduce((obj, contact) => {
		const firstLetter = contact.name[0].toUpperCase();
		return {
			...obj,
			[firstLetter]: [...(obj[firstLetter] || []), contact],
		};
	}, {});

	const sections = Object.keys(contactsByLetter)
		.sort()
		.map((letter) => ({
			data: contactsByLetter[letter].sort(compareNames),
			title: letter,
		}));

	return (
		<SectionList
			sections={sections}
			renderItem={renderItem}
			renderSectionHeader={renderSectionHeader}
		/>
	);
};

SectionListContacts.propTypes = {
	contacts: PropTypes.array,
};

export default SectionListContacts;
