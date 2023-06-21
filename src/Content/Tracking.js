import './Tracking.css';
import {useLoaderData} from 'react-router-dom'
import { Button, withAuthenticator } from '@aws-amplify/ui-react';

async function logTime(username){
    console.log('hello');
    const activity = document.getElementById('Activity').value;
    const start = document.getElementById('Start').value;
    const end = document.getElementById('End').value;
    if(activity == "" || start == "" || end == ""){
        alert("You must fill in all text boxes.");
        return;
    }
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    // create a JSON object with parameters for API call and store in a variable
    var payload = JSON.stringify({
        "httpMethod": "PUT", 
        "username": username,
        "activity": activity,
        "start": start,
        "end": end
    });
    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: payload
    };
    
    // var requestOptions = {
    //     method: 'PUT',
    //     headers:{
    //         "Content-Type": "application/json"
    //     },
    //     body: payload
    //   }
    // make API call with parameters and use promises to get response
    let response = await fetch("https://eeae2o3zd6.execute-api.us-east-2.amazonaws.com/default", requestOptions);
    let data = await response.json()
    alert(data.body.status);
    if(!response.ok){
        alert("Hmm, that didn't seem to work. Check if the time you are logging overlaps with another previously added.")
    }
}

function Tracking(){
    const username = useLoaderData()
    return (
        <div>
            <label>Activity :</label>
            <input type="text" id="Activity"></input>
            <label>Start :</label>
            <input type="text" id="Start"></input>
            <label>End :</label>
            <input type="text" id="End"></input>
            <Button
                onClick={(username) => logTime(username)}
            ></Button>
        </div>
        
    )
}

export default withAuthenticator(Tracking)