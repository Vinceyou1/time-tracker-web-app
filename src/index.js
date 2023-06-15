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
import Header from './Header'
import {Hub} from 'aws-amplify'

let username = localStorage.getItem("username");

function user(){
  return username;
}
Hub.listen('reload', () => {window.location.reload();})

const router = createBrowserRouter([
{ 
  element: <Header />,
  loader: user, 
  children:[
    {
      path: "/",
      element: <App />,
      loader: user,
    },
    {
      path: "/login",
      element: <Login />
    }
  ]
}
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
