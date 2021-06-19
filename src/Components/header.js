import { Component } from 'react';
import React from 'react-dom';
import './main_header.css';

class Header extends Component{
    constructor(props){
        super(props)
        this.state = {props}
    }
    render(){
        return <header className="saludo">
            <h1>Hola adddddddddd todos</h1>
        </header>
    }
}

export default Header;