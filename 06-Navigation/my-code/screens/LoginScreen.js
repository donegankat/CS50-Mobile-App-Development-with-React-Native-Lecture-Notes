import React from "react";
import { Button, View, StyleSheet, Text, TextInput } from "react-native";
import AuthContext from "../context/AuthContext";
import { login } from "../utils/api";

export default class LoginScreen extends React.Component {
    static contextType = AuthContext;

    state = {
        username: '',
        password: '',
        error: this.context.authError
    }

    login = async () => {
        try {
			const authResult = await login(this.state.username, this.state.password)

			if (authResult) {
                this.context.successfulSignInCallback();
            } else {
                this.setState({error: "Unknown authentication error"})
			}
		} catch (err) {
            this.setState({error: err.message})
		}
    };

    handleUsernameUpdate = username => {
        this.setState({username})
    }

    handlePasswordUpdate = password => {
        this.setState({password})
    }

    render() {
        return (
        <View style={styles.container}>
            <TextInput
                placeholder="username"
                value={this.state.username}
                onChangeText={this.handleUsernameUpdate}
                autoCapitalize="none"
            />
            <TextInput
                placeholder="password"
                value={this.state.password}
                onChangeText={this.handlePasswordUpdate}
                secureTextEntry
            />
            <Text style={styles.error}>{this.state.error}</Text>
            <Button title="Press to Log In" onPress={this.login} />
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1
  },
  text: {
    textAlign: "center"
  },
  error: {
      textAlign: "center",
      color: "red"
  }
});
