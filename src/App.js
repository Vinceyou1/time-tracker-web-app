import React from 'react';
import './App.css';
import '@aws-amplify/ui/dist/styles.css';
import {Link, useLoaderData} from 'react-router-dom'

function App() {
  console.log(useLoaderData());
  if(useLoaderData()){
    return(
      <div className="App">
        <h3>Welcome to Time Tracker!</h3>
        <Link to="login">Login or Register</Link>
      </div>
    )
  }
  else{ 
    return (
      <div className="App">
       <h3>Welcome to Time Tracker</h3>
       <Link to="login">Login or Register</Link>
     </div>
    );
  }
  
}

export default App;