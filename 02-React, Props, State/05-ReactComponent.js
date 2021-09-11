// Full file example from a codesandbox.io

// App.js
import React from "react";
import "./styles.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    }

    // If you don't want to explicitly bind `this` to the increaseCount method or invoke it using arrow functions, you can bind it here:
    // this.increaseCount = this.increaseCount.bind(this);

    // Alternatively you could do away with the separate increaseCount method and define it all here:
    //this.increaseCount = () => this.setState({ count: this.state.count + 1})
  }

  increaseCount() {
    // If you had 2 duplicate setStates in this method, React is smart enough to merge them together because it runs async in batches.
    // It would merge the initial state {count: 0} with the 2 setState operations {count: this.state.count + 1}, {count: this.state.count + 1}
    // Result of merge: {count: 0}, {count: this.state.count + 1}
    this.setState({
      count: this.state.count + 1
    });
  }

  increaseCountTwice() {
    // The following gets around the issue mentioned in increaseCount where the batches merge and only perform one of the duplicate operations.
    // It does this by taking the previous state and returning a new state.
    // This is what's known as an updater function.
    this.setState(prevState => ({ count: prevState.count + 1 }));
    this.setState(prevState => ({ count: prevState.count + 1 }));
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.count}</h1>
        <div>
          <h3>Version 1 (explicit bind):</h3>
          <button onClick={this.increaseCount.bind(this)}>Increase count</button>
        </div>

        <div>
          <h3>Version 2 (arrow notation):</h3>
          <button onClick={() => this.increaseCount()}>Increase count</button>
        </div>

        <br/>
        <hr/>
        <br/>

        <div>
          <h3>Increase Twice:</h3>
          <button onClick={() => this.increaseCountTwice()}>Increase count</button>
        </div>
      </div>
    );
  }
}







// index.js
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
)