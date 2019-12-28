import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// eslint-disable-next-line no-unused-vars
const Tile = props => {
  const row = props.index / 9;
  const col = props.index % 9;
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
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

class Sheet extends React.Component {
  renderTile(i) {
    return (
      <Tile
        value={this.props.tiles[i]}
        index={i}
        onClick={() => {
          this.props.onClick(i);
        }}
        starter={this.props.starters.find(i)}
      />
    );
  }
  render() {
    let items = [];
    for (let j = 0; j < 9; j++) {
      let subitems = [];
      for (let i = 9 * j; i < 9 * j + 9; i++) subitems.push(this.renderTile(i));
      items.push(<div className="tile-row">{subitems}</div>);
    }
    return <div>{items}</div>;
  }
}

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
