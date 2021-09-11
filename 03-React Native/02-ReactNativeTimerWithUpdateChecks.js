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

  componentDidMount() {
    // One way to bind `this` would be to use an arrow function (if we hadn't bound it during the time of creation) because `this` isn't bound to the current instance by default.
    setInterval(this.inc, 1000);
  }

  // `inc` can either be bound in `componentDidMount` using an arrow function OR we can use the syntax below to bind it at the time of creation.
  // This is the same as doing the following in the constructor: `this.inc = this.inc.bind(this)`
  inc = () => { // This syntax means that when we create this function, automatically bind it to this class
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  }

  render() {
    return (
      <View style={styles.appContainer}>
        <CountEvenNumbers count={this.state.count}></CountEvenNumbers>
      </View>
    );
  }  
}

class CountEvenNumbers extends React.Component {
  render() {
    return (
      <Text style={styles.count}>{this.props.count}</Text>
    )
  }

  shouldComponentUpdate(nextProps) {
    return !(nextProps.count % 2);
  }

  componentDidUpdate() {
    console.log("did update!", this.props.count);
  }
}

export default function App() {
  return (
    <Timer />
  );
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
