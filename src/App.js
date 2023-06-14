import React from 'react';
import './App.css';
import '@aws-amplify/ui/dist/styles.css';
import {Link} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <h3>Welcome to Time Tracker</h3>
      <Link to="login">Login or Register</Link>
    </div>
  );
}



export default App;