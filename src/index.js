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
      starters: []
    };
    generateNewPuzzle("random", this);
  }

  handleClick(i) {
    const solution = this.state.solution.slice(0, 81);
    const temp = this.state.tiles.slice(0, 81);
    const starters = this.state.starters.slice();
    if (starters.includes(i)) {
      return;
    }
    //temp[i] = i;
    this.setState({
      solution: solution,
      tiles: temp,
      starters: starters
    });
  }
  render() {
    const starters = this.state.starters.slice(0, this.state.starters.length);
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

const sugokuBoardToReactZenBoard = board => {
  let reactZenBoard = [];
  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 9; j++)
      reactZenBoard.push(board[i][j] === 0 ? null : board[i][j]);
  return reactZenBoard;
};

const getStarters = reactZenBoard => {
  let s = [];
  for (let i = 0; i < reactZenBoard.length; i++)
    if (reactZenBoard[i]) s.push(i);
  return s;
};

/**
 * from sugoku
 * @param {*} board
 */
const encodeBoard = board =>
  board.reduce(
    (result, row, i) =>
      result +
      `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? "" : "%2C"}`,
    ""
  );
/**
 * from Sugoku
 * @param {*} params
 */
const encodeParams = params =>
  Object.keys(params)
    .map(key => key + `=%5B${encodeBoard(params[key])}%5D`)
    .join("&");

const renderResponse = (res, puzzle) => {
  const data = res;
  const board = sugokuBoardToReactZenBoard(data.board);
  console.log(board);
  const starters = getStarters(board);
  let solution;
  fetch("https://sugoku.herokuapp.com/solve", {
    method: "POST",
    body: encodeParams(data),
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
    .then(response => response.json())
    .then(json => {
      console.log(json);

      solution = sugokuBoardToReactZenBoard(json.solution);
      puzzle.setState({
        tiles: board,
        solution: solution,
        starters: starters
      });
    });
};

/**
 *
 * @param {*} difficulty
 * @param {Puzzle} puzzle
 */
const generateNewPuzzle = (difficulty = "random", puzzle) => {
  const url = "https://sugoku.herokuapp.com/board";
  const queryParams = "?difficulty=";
  fetch(`${url}${queryParams}${difficulty}`)
    .then(
      response => {
        if (response.ok) return response.json();
        throw new Error("request failed");
      },
      networkError => {
        console.log(networkError.message);
      }
    )
    .then(jsonResponse => {
      return renderResponse(jsonResponse, puzzle);
    })
    .catch(error => {
      alert("There was an error in reaching the Sugoku api:\n" + error.message);
    });
};

ReactDOM.render(<Puzzle />, document.getElementById("root"));
