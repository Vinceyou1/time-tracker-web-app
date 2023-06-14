import React from 'react';
import './App.css';
import {Amplify} from 'aws-amplify';
import awsconfig from './aws-exports';
import {Authenticator} from '@aws-amplify/ui-react'
import '@aws-amplify/ui/dist/styles.css';

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <Authenticator />
      <title>TimeTracker</title>
      <h3>Welcome to Time Tracker</h3>
      <a href="https://time-tracker.auth.us-east-2.amazoncognito.com/signup?client_id=pks8i30h65ogcqfvmr77745gp&response_type=code&redirect_uri=http://localhost:8000/logged_in.html">
        Register or Login
      </a>
    </div>
  );
}

export default App;