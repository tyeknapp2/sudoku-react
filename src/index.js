import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Puzzle extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    return <div>HelloWorld</div>;
  }
}

ReactDOM.render(<Puzzle />, document.getElementById("root"));
