import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      id : 0,
      input : "",
      completedTimeIntervals : [],
      done : false
    };
    this.output = "";
  }


  playAudio = () =>{ 
    var audio = new Audio('https://www.soundjay.com/button/sounds/beep-01a.mp3');
    audio.play();
    return;
  } 


  inputChange = (e)=>{
    this.setState({input : e.target.value});
  }

  setTimer = ()=>{
    var val = this.inputArray[this.state.id];
    this.timeOut = setTimeout(()=>{
      this.playAudio();
      let arr = this.state.completedTimeIntervals;
      arr.push(val);
      this.setState({completedTimeIntervals : arr});
      if(this.state.id + 1 == this.inputArray.length){
        this.setState({done : true});
        clearTimeout(this.timeOut);
        return;
      }
      this.setState({id : this.state.id + 1},()=>{
        this.setTimer();
      });
    },val*60*1000);
  }

  setSequence = ()=>{
    this.setTimer(this.inputArray[this.state.id]);
    if(this.state.id + 1 < this.inputArray.length){
      this.setState({id : this.state.id + 1});
    }
    return;
  }

  start = ()=>{
    var input = this.state.input;
    if(input && input.indexOf("+") > -1){
      this.inputArray = input.split("+");
      this.setTimer();
    } 
  }

  getCompletedList = ()=>{
    let sum = 0;
    this.state.completedTimeIntervals.map((val)=>{
      sum  = sum + val*1;
    });
    return <div>
            <p> {this.state.completedTimeIntervals.map((val,id)=>{
              if(id == 0) return val;
              return  " | " + val ;
              })} 
            </p>
            <br/>
            <p>
              Time Completed : {sum}
            </p>
          </div>
  }

  apply3hrs = ()=>{
    this.input = "4+6+6+6+6+1.8+1.8+1.8+1.8+1.8+1.8+1.8+1.8+1.8+1.8+14+8+9+9+9+9+9+7+1.2+1.2+1.2+1.2+1.2+1.2+1.2+1.2+1.2+1.2+1.2+1.2+1.2+1.2+1.2+1.2+1.2+1.2+1.2+1.2+1.2+1.2+1.2+1.2+1.2+1.2+1.2+1.2+1.2+1.2+1.2+1.2+1.2+1.2+19.2";
    if(this.state.input != this.input) this.setState({input : this.input}); 
    return;
  }

  apply2hrs = ()=>{
    this.input = "0.2+0.2";
    if(this.state.input != this.input) this.setState({input : this.input}); 
    return;
  }


  render(){
    return (
      <div className="App">
        <header className="App-header">
        <h1>Sequence Timer</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <button onClick={this.apply3hrs} type="button">Apply Sequence For 3hrs Exam</button>
          <button onClick={this.apply2hrs} type="button">Apply Sequence For 2hrs Exam</button>  
          <br/>    
          {this.state.done ? <p> Done </p> : ""}
          <input style={{width: '80%'}} onChange={this.inputChange} value = {this.state.input}/> 
          <br/>
          <button onClick={this.start} type="button">Start Timer</button>        
          {this.getCompletedList()}
        </header>
      </div>
    );
  }
}

export default App;
