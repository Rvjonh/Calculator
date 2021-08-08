import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Calculator extends Component{
  constructor(props){
      super(props)
      this.state ={
          result : "Result",
          operation : "0"
      }
  }
  componentDidMount(){
      document.addEventListener("keydown",this.handlePressing);
  }
  componentWillUnmount(){
      document.removeEventListener("keypress");
  }

  handleClear = ()=>{
      this.setState({
            result : "Result",
            operation : "0"
      });
  }

  handlePressing = (e)=>{
      console.log(e.code);
  }

  handleAdding = (e)=>{
      this.setState({
          operation:this.state.operation==="0" ? e.target.innerText : this.state.operation+e.target.innerText
        })
  }

  handleResult = ()=>{
      this.setState({
        result : this.state.operation
      })
  }

  render(){
      return(
          <div id="calculator">
              <div id="display">
                  <p>{this.state.result}</p>
                  <p>{this.state.operation}</p>
              </div>
              <div id="board">
                  <button className="button" onClick={this.handleAdding} id="zero">0</button>
                  <button className="button" onClick={this.handleAdding} id="one">1</button>
                  <button className="button" onClick={this.handleAdding} id="two">2</button>
                  <button className="button" onClick={this.handleAdding} id="three">3</button>
                  <button className="button" onClick={this.handleAdding} id="four">4</button>
                  <button className="button" onClick={this.handleAdding} id="five">5</button>
                  <button className="button" onClick={this.handleAdding} id="six">6</button>
                  <button className="button" onClick={this.handleAdding} id="seven">7</button>
                  <button className="button" onClick={this.handleAdding} id="eight">8</button>
                  <button className="button" onClick={this.handleAdding} id="nine">9</button>


                  <button className="button" onClick={this.handleAdding} id="add">+</button>
                  <button className="button" onClick={this.handleAdding} id="subtract">-</button>
                  <button className="button" onClick={this.handleAdding} id="multiply">*</button>
                  <button className="button" onClick={this.handleAdding} id="divide">/</button>

                  <button className="button" onClick={this.handleAdding} id="decimal">.</button>
                  <button className="button" onClick={this.handleClear} id="clear">AC</button>
                  <button className="button" onClick={this.handleResult} id="equals">=</button>

              </div>
          </div>
      )
  }
}


ReactDOM.render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>,
  document.getElementById('root')
);