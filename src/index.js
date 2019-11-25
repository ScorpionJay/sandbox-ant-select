import React from "react";
import ReactDOM from "react-dom";
import Select from "./components/Select";

import "./style.css";

function App() {
  let arr = new Array(10000).fill(1).map((item, index) => "选项" + index);
  arr.push(
    "asdfasdfasdfasdfasdfsdfafasdfasdfasdfasdfasdfsdfafasdfasdfasdfasdfasdfsdfaf"
  );
  return (
    <div className="App">
      <h1>Hello React!</h1>
      <Select value="选项1" options={arr} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
