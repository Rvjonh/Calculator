import React from 'react';
import './App.css';
import Header from './Components/header.js';

/* function Header(){
  return(
    <header >
      <h1>Hola a todos</h1>
    </header>
  );
}
 */

function App() {
  return (
    <div>
      <Header />
      <h1>Starting here your project...</h1>
      <ul>
        <li>one</li>
        <li>two</li>
        <li>three</li>
      </ul>
    </div>
  );
}

export default App;


