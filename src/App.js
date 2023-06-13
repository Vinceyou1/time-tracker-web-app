import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <>
      <title>TimeTracker</title>
      <h3>Welcome to Time Tracker</h3>
      <a href="https://time-tracker.auth.us-east-2.amazoncognito.com/signup?client_id=pks8i30h65ogcqfvmr77745gp&response_type=code&redirect_uri=http://localhost:8000/logged_in.html">
        Register or Login
      </a>
    </>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
