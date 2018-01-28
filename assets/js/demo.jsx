import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function run_demo(root) {
  ReactDOM.render(<Memory/>, root);
}

/*class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { side: props.side };
  }

  toggle(side) {
    var side = +!this.state.side;
    this.setState({side: side});
  }

  render() {
    var toggle = this.toggle.bind(this);
    return (
      <div className="row">
        <Side show={this.state.side == 0} toggle={toggle} />
        <div className="col">
          &nbsp;
        </div>
        <Side show={this.state.side == 1} toggle={toggle} />
      </div>
    );
  }
}

function Side(params) {
  if (params.show) {
    return (
      <div id="side-0" className="side col" onMouseOver={ () => params.toggle() }>
        <Button onClick={ () => alert("cheater") }>Click Me</Button>
      </div>
    );
  }
  else {
    return (
      <div id="side-0" className="side col">
        &nbsp;
      </div>
    );
  }
} */


class Memory extends React.Component{
 
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(16).fill(null),
        squaresValue: ['A','B','A','B','C','C','D','D','E','E','F','F','G','H','H','G'],
        squaresScored: Array(16).fill(false)

      }],
      score: 0,
      turnOfA : false
    };
  }
 /* IntialseValues(){
    const history = this.state.history;
    const current = history[history.length - 1];
    const squaresValue = current.squaresValue.slice();
    var score = this.state.score;
   /* for(var k=0; k<16; k++ ){
      squaresValue[k] = 
    } 
    squaresValue[0] = 'A';
    squaresValue[1] = 'B';
    squaresValue[2] = 'A';
    squaresValue[3] = 'B';
    squaresValue[4] = 'C';
    squaresValue[5] = 'C';
    squaresValue[6] = 'D';
    squaresValue[7] = 'D';
    squaresValue[8] = 'E';
    squaresValue[9] = 'E';
    squaresValue[10] = 'F';
    squaresValue[11] = 'F';
    squaresValue[12] = 'G';
    squaresValue[13] = 'H';
    squaresValue[14] = 'H';
    squaresValue[15] = 'G';

    this.setState({
      history:history.concat([{
          squares:current.squares,
          squaresScored: current.squaresScored,
          squaresValue: squaresValue
      }]),
      score : score
  });


} */
  handleClick(i){
    // functional programming jaisa chutiyapa 
    // nat neh explain kiya tha though copying huma
    // slow hogi but rendering mein hum faad denge
    // immutable array banana padega
    // splice something
   /* const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (current.squares[i] == null){
       
        //const squares = this.state.squares.slice();
        squares[i] = this.state.flag? 'X' : 'O';
        const flag = !this.state.flag;
        this.setState({
            history:history.concat([{
                squares:squares
            }]),
            flag: flag,
        });
       
    } */
    console.log(i);
    console.log("button clicked");
    const history = this.state.history;
    var score = this.state.score;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const squaresScored = current.squaresScored.slice();
    var turnOfA = this.state.turnOfA;
    var flag = false;
    var second = false;
    if(squares[i] == null){
    if(!turnOfA){
      squares[i] = current.squaresValue[i];
      turnOfA = !turnOfA;
    }
    else{
      squares[i] = current.squaresValue[i]; 
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
      if(!flag){
        turnOfA = !turnOfA;
        for(var m=0; m<16; m++){
          if(!squaresScored[m]){
            console.log("making null");
            squares[m] = null;
          }
        }
      }
      
    }
  }

    /*
    if (squares[i] === null & turnOfA){
      squares[i] = current.squaresValue[i];
      for(var j =0; j<16; j++){
        if(j != i){
          if(squares[j] === squares[i] & squares[j] != "done"){
            flag = true;
            squares[j] ="done";
            squares[i] = "done";
            score = score + 1;
            turnOfA = !turnOfA;
          }
        }
      }
    } */
  
    this.setState({
      history:history.concat([{
          squares:squares,
          squaresScored:squaresScored,
          squaresValue: current.squaresValue,
      }]),
      score : score,
      turnOfA : turnOfA
  });
 
    
  }
  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }
  render() {
    const history = this.state.history;
    const score = this.state.score;
    const current = history[history.length - 1];
   // const winner = calculateWinner(current.squares);

    /*const moves = history.map((step, move) => {
      console.log("move is",move);
      console.log("step is ",step);  
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    }); */
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
        <div className="score"><p>Score of the game is :: {score} </p></div>
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
    />);}
    else if(value != null & !scored){
      return ( 
        <Squarevalues 
        value={this.props.squares[i]}
        onClick= {() => this.props.onClick(i)}
      />);}
    else{
      return ( 
        <Squarescored 
        value={this.props.squares[i]}
        onClick= {() => this.props.onClick(i)}
      />);
    }
      
    }
  


  render(){
     /* const answer = calculateWinner(this.state.squares);
      let status;
      if(answer){
          status = 'Winner' + answer;
      }
      else{
          status = 'Next player:' + (this.state.flag ? 'X': 'O'); 
      } */
     /* if ( answer!= null){
          'game ended Winner is' + answer;               
      }*/
    //const status = 'Next player:' + (this.state.flag ? 'X': 'O');

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
      <button className="square" onClick={props.onClick} >
      {props.value}
       </button>
  );
}
function Squarevalues(props){
  return(
    <button className="square-filled" onClick={props.onClick} >
    {props.value}
     </button>
  );
}

function Squarescored(props){
  return(
    <button className="square-scored" onClick={props.onClick} >
    {props.value}
     </button>
  );
}

