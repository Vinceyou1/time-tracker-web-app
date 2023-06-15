import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './Login'
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {Hub} from 'aws-amplify';
import Header from './Header'

let username = null;
Hub.listen('user', (data) => {
  username = data.payload.username;
  console.log('User ' + username + ' has signed in ');
})

function user(){
  return localStorage.getItem('user');
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: user,
  },
  {
    path: "login",
    element: <Login />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Header />
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
