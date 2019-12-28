import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// eslint-disable-next-line no-unused-vars
const Tile = props => {
  const row = props.row;
  const col = props.col;
  const starter = props.starter;
  return (
    <button
      className={
        "tile " +
        (!starter &&
        (((row <= 2 || row >= 6) && (col <= 2 || col >= 6)) ||
          (!(row <= 2 || row >= 6) && !(col <= 2 || col >= 6)))
          ? "grey "
          : "") +
        (starter ? "dark-grey " : "") +
        (row % 3 === 0 ? "thick-top " : "") +
        (row % 3 === 2 ? "thick-bottom " : "") +
        (col % 3 === 0 ? "thick-left " : "") +
        (col % 3 === 2 ? "thick-right " : "")
      }
    >
      {props.value}
    </button>
  );
};

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
