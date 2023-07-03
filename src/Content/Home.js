import React from 'react';
import './Home.css';
import '@aws-amplify/ui/dist/styles.css';

function App() {
  return(
    <div className="App">
      <h1>Welcome to Time Tracker!</h1>
      <h3 style={{textAlign: "center", marginBottom: 10}}>Click on Showcase to see a sample day</h3>
      <h3 style={{textAlign: "center", marginTop: 0}}>Register to try tracking your own data</h3>
    </div>
  )
}

export default App;