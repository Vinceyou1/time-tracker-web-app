import React from "react";
import "./Activity.css";
import { Button } from '@mui/material';

function user(){
    const lastAuthUserKey = 'CognitoIdentityServiceProvider.3j6k22tm9ql3b2jr497qs5250e.LastAuthUser';
    return localStorage.getItem(lastAuthUserKey);
}

async function deleteItem(index, getData, setData){
    const username = user();
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    
    var payload = JSON.stringify({
        "httpMethod": "DELETE", 
        "username": String(username),
        "index": String(index),
    });
    // using built in JSON utility package turn object to string and store in a variable
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: payload
    };

    let response = await fetch("https://eeae2o3zd6.execute-api.us-east-2.amazonaws.com/default", requestOptions);
    let json = await response.json();
    getData(setData);
}

function Activity({index, name, start, end, getData, setData}){
    let startTime = new Date(parseInt(start));
    let endTime = new Date(parseInt(end));
    console.log(startTime);
    return(
        <div className="Activity">
            <p>{name}</p>
            <p>{startTime.toString()}</p>
            <p>{endTime.toDateString()}</p>
            <p>{index}</p>
            <Button variant="contained" onClick={() => deleteItem(index, getData, setData)}></Button>
        </div>
    )
}

export default Activity