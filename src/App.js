import React from 'react';
import './App.css';
import {Amplify} from 'aws-amplify';
import awsconfig from './aws-exports';
import {Authenticator} from '@aws-amplify/ui-react'
import '@aws-amplify/ui/dist/styles.css';
import {Link} from 'react-router-dom'
Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <title>TimeTracker</title>
      <h3>Welcome to Time Tracker</h3>
      <Link to="login">Login or Register</Link>
    </div>
  );
}

function Login(){
  return(
    <div className="App">
      <title>Login</title>
      <Authenticator/>
      <h3>Hi!</h3>
    </div>
  )
}

export {App, Login};