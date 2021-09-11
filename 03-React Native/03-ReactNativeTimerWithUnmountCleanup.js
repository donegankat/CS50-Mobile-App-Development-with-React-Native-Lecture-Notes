import * as React from 'react';
import { Text, View, StyleSheet, Button, ScrollView, Switch } from 'react-native';
import Constants from 'expo-constants';

class Timer extends React.Component {
  constructor() {
    super();

    this.state = {
      count: 0
    }
  }

  // `inc` can either be bound in `componentDidMount` using an arrow function OR we can use the syntax below to bind it at the time of creation.
  // This is the same as doing the following in the constructor: `this.inc = this.inc.bind(this)`
  inc = () => { // This syntax means that when we create this function, automatically bind it to this class
    console.log("Increment!");
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  }

  render() {
    return (
      <View style={styles.appContainer}>
        <Text style={styles.count}>{this.state.count}</Text>
      </View>
    );
  }

  componentDidMount() {
    // One way to bind `this` would be to use an arrow function (if we hadn't bound it during the time of creation) because `this` isn't bound to the current instance by default.
    this.interval = setInterval(this.inc, 1000);
  }

  componentWillUnmount() {
    // The timer has to be cleaned up here or else it will continue to run in the background and will be duplicated each time we toggle the timer to be visible again. This will cause memory leaks.
    clearInterval(this.interval);
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      showCounter: true
    }
  }

  toggleCounter = () => this.setState(prevState => ({
    showCounter: !prevState.showCounter
  }));

  render() {
    if (this.state.showCounter) {
      return (
        <View style={styles.appContainer}>
          <Button title="Toggle" onPress={this.toggleCounter} />
          <Timer />
        </View>
      );
    } else {
      return (<Button title="Toggle" onPress={this.toggleCounter} />)
    }
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  count: {
    fontSize: 48
  }
});