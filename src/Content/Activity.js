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

    await fetch("https://eeae2o3zd6.execute-api.us-east-2.amazonaws.com/default", requestOptions);
    getData(setData);
}

function formatDate(date){
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();
    let hh = date.getHours();
    let ampm = hh >= 12 ? 'pm' : 'am';
    let minutes = date.getMinutes();
    
    if(hh === 0) hh = 12;
    if(hh > 12) hh -= 12;
    if(minutes < 10) minutes = '0' + minutes;
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedDate = dd + '/' + mm + '/' + yyyy + " " + hh + ":" + minutes + " " + ampm;
    return formattedDate
}

function Activity({index, name, start, end, getData, setData}){
    let startTime = new Date(parseInt(start));
    let endTime = new Date(parseInt(end));
    console.log(startTime);
    
    return(
        <div className="Activity">
            <div className="Info">
                {name} <br/>
                Start: {formatDate(startTime)} <br/>
                End: {formatDate(endTime)}
            </div>
            <div className="Delete">
                <Button sx={{
                    backgroundColor: "lightblue",
                    color: "black",
                    height: 50,
                    ":hover": {
                        backgroundColor: "red",
                        color: "white"
                    }
                }} variant="contained" onClick={() => deleteItem(index, getData, setData)}>DELETE</Button>
            </div>
            
        </div>
    )
}

export default Activity