import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./index.css";

//symbols allowed in the calculator "+ - * / .";
let symbols = /[/*-+-.]/;
let numbers = /^[0-9]+$/;
let endsWithOperator = /[x+‑/]$/;

let limitDigit = 22;

class Calculator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			startedExpresion: false,
			aux: "",
			lastOperation: "0",
			result: "0",
			limitReachState : false
		};
	}
	componentDidMount() {
		document.addEventListener("keydown", this.handlePressing);
	}
	componentWillUnmount() {
		document.removeEventListener("keydown", this.handlePressing);
	}

	handlePressing = (e) => {
		//for instruccions
		switch (e.key.toLowerCase()) {
			case "enter":
				this.handleResult();
				break;
			case "delete":
				this.handleClear();
				break;
			case "backspace":
				this.handleBackDelete();
				break;

			default:
				//nothing
		}
		//to detect the numbers or the digits
		if (numbers.test(e.key) || symbols.test(e.key)) {
			this.handleEvaluate(e.key);
		}
	};


	handleBackDelete = () => {
		if (this.state.startedExpresion) {
			this.setState({
				lastOperation: this.state.lastOperation.slice(0, this.state.lastOperation.length - 1),
				result: this.state.result.slice(0, this.state.result.length - 1),
			});

			if(this.state.lastOperation.length === 0){
				this.setState({
					startedExpresion: false,
					lastOperation: "0"
				})
			}			
			if(this.state.result.length === 0){
				this.setState({
					startedExpresion: false,
					result: "0"
				})
			}

		} else {
			this.handleClear();
		}
	};

	handleClear = () => {
		this.setState({
			startedExpresion: false,
			aux: "",
			lastOperation: "0",
			result: "0",
		});
	};

	handleClicking = (e) => {
		this.handleEvaluate(e.target.innerHTML);
	};

	handleEvaluate = (value) => {
		// if there is no space for new digits
		if (this.state.result.length >= limitDigit) {
			this.limitReached();
		} else {
			// attaching new values to the expresiong
			let expresion = value;
			expresion = expresion === "*" ? "x" : expresion;

			if (!this.state.startedExpresion) {

				if(parseInt(this.state.result) !== 0){
					this.setState({
						startedExpresion: true,
						lastOperation : this.state.lastOperation + expresion,
						result : this.state.result + expresion
					});

				}else if (expresion === ".") {
					if (!this.state.result.includes(".")) {
						this.setState({
							startedExpresion: true,
							lastOperation: this.state.lastOperation + ".",
							result: this.state.result + ".",
						});
					}

				} else if (/[1-9]/.test(expresion)) {
					this.setState({
						startedExpresion: true,
						lastOperation: expresion,
						result: expresion,
					});
				} else if (/[+|\-|x|/]/.test(expresion)) {
					this.setState({
						startedExpresion: true,
						lastOperation: this.state.lastOperation + expresion,
						result: expresion,
					});
				}
			} else {
				if (expresion === ".") {
					if (!this.state.result.includes(".")) {
						if (!/[+x\-/]/.test(this.state.result[this.state.result.length - 1])) {
							this.setState({
								lastOperation: this.state.lastOperation + expresion,
								result: this.state.result + expresion,
							});
						} else {
							console.log("de lokos");
							this.setState({
								lastOperation: this.state.lastOperation + "0.",
								result: this.state.result + "0.",
							});
						}
					}
				} else if (/[0-9]/.test(expresion)) {
					this.setState({
						lastOperation: this.state.lastOperation + expresion,
						result: this.state.result + expresion,
					});

				} else if (/[+|x|/]/.test(expresion)) {

					if(/[+|x|/]/.test(this.state.lastOperation[this.state.lastOperation.length -1])){
						this.setState({
							lastOperation: this.state.lastOperation.slice(0, this.state.lastOperation.length - 1) + expresion,
							result: expresion,
						});
					}else if(/[-]/.test(this.state.lastOperation[this.state.lastOperation.length -1])){
						this.setState({
							lastOperation: this.state.lastOperation.slice(0, this.state.lastOperation.length - 2) + expresion,
							result: expresion,
						});
					}else{
						this.setState({
							lastOperation : this.state.lastOperation + expresion,
							result : expresion
						})
						
					}

				}else if(/[-]/.test(expresion)){
					if(!/[-]/.test(this.state.lastOperation[this.state.lastOperation.length-1])){
						this.setState({
							lastOperation : this.state.lastOperation + expresion,
							result : expresion
						});
					}
				}
			}
		}
	};
	
	limitReached = () => {
		if(!this.state.limitReachState){

			this.setState({
				aux: this.state.lastOperation,
				lastOperation: "Limit reached",
				limitReachState : true
			});
			setTimeout(() => {
				this.setState({
					lastOperation: this.state.aux,
					limitReachState : false
				});
			}, 1000);

		}
	};

	handleResult = () => {
		if (this.state.startedExpresion) {
			if(this.state.result[this.state.result.length - 1] === ".") {
				this.setState({
					startedExpresion : false,
					lastOperation: this.operate(this.state.lastOperation + "0"),
					result: this.operate(this.state.lastOperation + "0"),
				});
			}else {
				this.setState({
					startedExpresion : false,
					lastOperation: this.operate(this.state.lastOperation),
					result : "0"
				});
			}

			if(Number.isNaN(this.state.result)){
				this.setState({
					lastOperation : "0",
					result : "0"
				})
			}

		}
	};
	operate = (formula) => {
		let expression = formula;
		while (endsWithOperator.test(expression)) {
			expression = expression.slice(0, -1);
		}
		expression = expression.replace(/x/g, "*").replace(/‑/g, "-").replace("--", "+0+0+0+0+0+0+");
		let answer;
		try{
			// eslint-disable-next-line
			answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
		}catch{
			answer = NaN;
		}
		
		return answer.toString();
	};

	render() {
		return (
			<div id="calculator">
				<div className="panel">
					<p id="formula">{this.state.lastOperation}</p>
					<p id="display">{this.state.result}</p>
				</div>

				<div id="board">
					<button className="button" onClick={this.handleClicking} id="zero">0</button>
					<button className="button" onClick={this.handleClicking} id="one">1</button>
					<button className="button" onClick={this.handleClicking} id="two">2</button>
					<button className="button" onClick={this.handleClicking} id="three">3</button>
					<button className="button" onClick={this.handleClicking} id="four">4</button>
					<button className="button" onClick={this.handleClicking} id="five">5</button>
					<button className="button" onClick={this.handleClicking} id="six">6</button>
					<button className="button" onClick={this.handleClicking} id="seven">7</button>
					<button className="button" onClick={this.handleClicking} id="eight">8</button>
					<button className="button" onClick={this.handleClicking} id="nine">9</button>

					<button className="button" onClick={this.handleClicking} id="add">+</button>
					<button className="button" onClick={this.handleClicking} id="subtract">-</button>
					<button className="button" onClick={this.handleClicking} id="multiply">x</button>
					<button className="button" onClick={this.handleClicking} id="divide">/</button>

					<button className="button" onClick={this.handleClicking} id="decimal">.</button>
					<button className="button" onClick={this.handleClear} id="clear">AC</button>
					<button className="button" onClick={this.handleResult} id="equals">=</button>
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<React.StrictMode>
		<Calculator />
	</React.StrictMode>,
	document.getElementById("root")
);
