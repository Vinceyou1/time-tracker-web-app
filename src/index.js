import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Content/Home';
import Login from './Content/Login'
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Header from './Content/Header';
import NotFound from './Content/NotFound';
import Tracking from './Content/Tracking';
import Log from './Content/Log';

function user(){
  const lastAuthUserKey = 'CognitoIdentityServiceProvider.3j6k22tm9ql3b2jr497qs5250e.LastAuthUser';
  return localStorage.getItem(lastAuthUserKey);
}

const router = createBrowserRouter([
  { 
    element: <Header />,
    loader: user, 
    children:[
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/tracking",
        element: <Tracking />,
        loader: user
      },
      {
        path: "/showcase",
        element: <Log />,
        loader: () => {return "Vinceyou1";}
      },
      {
        path: "/log",
        element: <Log />,
        loader: user
      },
      {
        element: <NotFound />,
        path: "*"
      }
    ]
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);


// If you want to start measuring performance in your App, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
