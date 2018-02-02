import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

// Attribution : https://reactjs.org/tutorial/tutorial.html
// Attribution : https://reactjs.org/docs/hello-world.html
// Attribution : Nats memory starter code

export default function run_demo(root) {
  ReactDOM.render(<Memory/>, root);
}


class Memory extends React.Component{

  constructor(props){
    super(props);
   // const squaresValue = ['A','B','A','B','C','C','D','D','E','E','F','F','G','H','H','G'];
    this.state = {
      history: [{
        squares: Array(16).fill(null),
        squaresScored: Array(16).fill(false)

      }],
      score: 0,
      turnOfA : false,
      clicks : 0
    };
  }

  handleClick(i){
    console.log(i);
    console.log("button clicked");
    const squaresValue = ['A','B','A','B','C','C','D','D','E','E','F','F','G','H','H','G'];
    const history = this.state.history;
    var score = this.state.score;
    var clicks = this.state.clicks;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const squaresScored = current.squaresScored.slice();
    var turnOfA = this.state.turnOfA;
    var flag = false;
    var secondflag = false;

    if(squares[i] == null){
      clicks = clicks + 1;
      if(!turnOfA){
        squares[i] = squaresValue[i];
        turnOfA = !turnOfA;
        secondflag = true;
        this.setState({
          history:history.concat([{
              squares:squares,
              squaresScored:squaresScored,
          }]),
          score : score,
          turnOfA : turnOfA,
          clicks: clicks
        });
        
      }
      else{
       squares[i] = squaresValue[i];
       for(var j =0; j<16; j++){
        if(j != i){
          if(squares[j] === squares[i] & !squaresScored[j]){
            flag = true;
          // squares[j] ="done";
          // squares[i] = "done";
            squaresScored[i] = true;
            squaresScored[j] = true;
            score = score + 1;
            turnOfA = !turnOfA;
          }
        }
      }
       this.setState({
        history:history.concat([{
            squares:squares,
            squaresScored:squaresScored,
        }]),
        score : score,
        turnOfA : turnOfA,
        clicks: clicks
        }); 
    
      }
    }
    else{
      flag = true;
      this.setState({
        history:history.concat([{
            squares:squares,
            squaresScored:squaresScored,
          }]),
        score : score,
        turnOfA : turnOfA,
        clicks: clicks
      }); 
    }
    setTimeout(()=>{
      if (!flag & !secondflag) {
        turnOfA = !turnOfA;
        for(var m=0; m<16; m++){
          if(!squaresScored[m]){
            console.log("making null");
            squares[m] = null;
          }
        }
        this.setState({
          history:history.concat([{
              squares:squares,
              squaresScored:squaresScored,
          }]),
          score : score,
          turnOfA : turnOfA,
          clicks: clicks
        }); 
        
      }
    },500);    
  }
  restartFn(){
    const score =0;
    const turnOfA = false;
    const clicks = 0;
    const history = [{
      squares: Array(16).fill(null),
      squaresScored: Array(16).fill(false)

    }];
    this.setState({
      history: history,
      score : score,
      turnOfA : turnOfA,
      clicks: clicks
    });
  }
  render() {
    const history = this.state.history;
    const score = this.state.score;
    const current = history[history.length - 1];
    return (
    <div>
      <div className="game">
        <div className="game-board">
          <Board 
             squares= {current.squares}
             squaresScored = {current.squaresScored}
             onClick = {(i) => this.handleClick(i)}
         />
        </div>
      </div>
      <div >
        <div className="score"><p>Number of clicks :: {this.state.clicks} </p></div>
      </div>
      <div >
        <div className="score"><p>Number of tiles resolved :: {score} </p></div>
      </div>
      <div>
        <RestartFunc onClick = {() => this.restartFn()} />
        <a className="btn btn-primary btn-lg github" href="https://github.com/rishab121/memory" target="\blank">
          Github Link
        </a>
      </div>
    </div>
    );
  }

}


class Board extends React.Component {
  renderSquare(i) {
    const value = this.props.squares[i];
    const scored = this.props.squaresScored[i];
    if (value == null){
      return ( 
        <Square 
        value={this.props.squares[i]}
        onClick= {() => this.props.onClick(i)}
      />);
    }
    else if(value != null & !scored){
      return ( 
        <Squarevalues 
        value={this.props.squares[i]}
        onClick= {() => this.props.onClick(i)}
      />);
    }
    else{
      return ( 
        <Squarescored 
        value={this.props.squares[i]}
        onClick= {() => this.props.onClick(i)}
      />);
    }
      
  }
  render(){
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
        </div>
        <div className="board-row">
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
        </div>
        <div className="board-row">
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
        </div>
        <div className="board-row">
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}
        </div>
      </div>
    );
  }
}



function Square(props){
  return (
      <button className="square btn " onClick={props.onClick} >
      {props.value}
       </button>
  );
}
function Squarevalues(props){
  return(
    <button className="square-filled btn" onClick={props.onClick} >
    {props.value}
     </button>
  );
}

function Squarescored(props){
  return(
    <button className="square-scored btn"  onClick={props.onClick} >
    {props.value}
     </button>
  );
}

function RestartFunc(props){
  return(
    <button className="btn btn-danger btn-lg" onClick={props.onClick} >
    Restart
     </button>
  );
}


