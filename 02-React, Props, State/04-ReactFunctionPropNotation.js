const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
};

// Version 1. This is the same as Version 2.
const AppV1 = (props) => (
    <div style={styles}>
        <h1>{props.count}</h1>
    </div>
);

// Version 2. This is the same as Version 1.
const AppV2 = function(props) {
    return (
        <div style={styles}>
            <h1>{props.count}</h1>
        </div>
    );
}

let count1 = 0;
let count2 = 0;

// Version 1 of using arrow notation to render AppV1.
setInterval(() =>
    render(<AppV1 count={count1++} />, document.getElementById("root1")),
    1000
);

// Version 2 of using a function to render AppV2.
setInterval(
    function() {
        render(<AppV2 count={count2++} />, document.getElementById("root2"))
    },
    1000
);











// Full file example from a codesandbox.io

// App.js
import React from "react";
import "./styles.css";

export default function App(props) {
  return (
    <div className="App">
      <h1>{props.count}</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

// index.js
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
let count = 0;

setInterval(() =>
  ReactDOM.render(
    <React.StrictMode>
      <App count={count++} />
    </React.StrictMode>,
    rootElement
  ),
  1000
);
