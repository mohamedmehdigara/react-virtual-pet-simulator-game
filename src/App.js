import React from 'react';
import './App.css';
import Pet from './components/Pet';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Virtual Pet Simulator</h1>
      </header>
      <main>
        <Pet />
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Your Company</p>
      </footer>
    </div>
  );
}

export default App;
