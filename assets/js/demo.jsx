import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

// Attribution : https://reactjs.org/tutorial/tutorial.html
// Attribution : https://reactjs.org/docs/hello-world.html
// Attribution : Nats memory starter code

export default function run_demo(root,channel) {
  ReactDOM.render(<Memory channel ={channel}/>, root);
}


class Memory extends React.Component{

  constructor(props){
    super(props);
    this.channel = props.channel;
    this.channel.join()
    .receive("ok", this.gotView.bind(this))
    .receive("error", resp => { console.log("Unable to join", resp); });
    this.state = {
      squares: [],
      squaresscored: [],
      score: 0,
      turnofa: false,
      clicks: 0,
    };
    
  }
  gotView(view){
    this.setState(view.game);
    setTimeout(()=>{
      var flag = view.game.flag;
      var secondflag = view.game.secondflag;
      if (!flag & !secondflag){
        this.handleTimeOut(view.game);
      }

    },500); 

  }
  timeoutView(view){
    //console.log("Timeout view");
   // console.log(view.game);
    this.setState(view.game);
  }
  handleClickByServer(i){
    //console.log("yaha aaay");
    this.channel.push("handleClickByServer",{num:i })
        .receive("ok",this.gotView.bind(this))
  }
  handleTimeOut(game){
    this.channel.push("handleTimeOut",{game: game})
        .receive("ok",this.timeoutView.bind(this))
  }

  handleClick(i){
    //console.log("clicked")
     this.handleClickByServer(i); 
  }
  
  restartFn(){
    this.channel.push("restartFn",{})
    .receive("ok",this.timeoutView.bind(this))
  }
  render() {
    //const history = this.state.history;
   // console.log(this.state)
    const score = this.state.score;
    const current = this.state;
    return (
    <div>
      <div className="game">
        <div className="game-board">
          <Board 
             squares= {current.squares}
             squaresscored = {current.squaresscored}
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
        <a className="btn btn-primary btn-lg github" href="https://github.com/rishab121/memory" target="_blank">
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
    const scored = this.props.squaresscored[i];
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


