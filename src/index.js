import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// eslint-disable-next-line no-unused-vars
const Tile = props => {
  const row = Math.floor(props.index / 9);
  const col = props.index % 9;
  const starter = props.starter;
  return (
    <button
      className={
        "tile " +
        (!starter &&
        (((row < 3 || row >= 6) && (col <= 2 || col >= 6)) ||
          (!(row < 3 || row >= 6) && !(col <= 2 || col >= 6)))
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
        starter={this.props.starters.includes(i)}
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
    this.state = {
      tiles: [Array(81).fill(null)],
      solution: [Array(81).fill(null)],
      starters: [1, 34, 25, 17, 3, 79, 28, 75, 48, 20, 56, 65, 6, 73, 8, 22, 44]
    };
  }

  handleClick(i) {
    const solution = this.state.solution.slice(0, 81);
    const temp = this.state.tiles.slice(0, 81);
    const starters = this.state.starters.slice(0, 17);
    if (starters.includes(i)) {
      return;
    }
    temp[i] = i;
    this.setState({
      solution: solution,
      tiles: temp,
      starters: starters
    });
  }
  render() {
    const starters = this.state.starters.slice(0, 17);
    return (
      <div>
        <div className="title">ReactZen Sudoku</div>
        <div className="puzzle">
          <div className="sheet">
            <Sheet
              tiles={this.state.tiles}
              starters={starters}
              onClick={i => this.handleClick(i)}
            />
          </div>
        </div>
      </div>
    );
  }
}

const generateNewSolutionArray = () => {};
ReactDOM.render(<Puzzle />, document.getElementById("root"));
