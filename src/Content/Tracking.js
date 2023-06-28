import './Tracking.css';
import { useLoaderData } from 'react-router-dom'
import { Button, withAuthenticator } from '@aws-amplify/ui-react';
import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Activity from './Activity';

let username = null;

async function logTime(){
    console.log(username);
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
        "username": String(username),
        "activity": String(activity),
        "start": String(start),
        "end": String(end)
    });
    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: payload
    };

    let response = await fetch("https://eeae2o3zd6.execute-api.us-east-2.amazonaws.com/default", requestOptions);
    let data = await response.json()
    alert(data.body.status);
    if(!response.ok){
        alert("Hmm, that didn't seem to work. Check if the time you are logging overlaps with another previously added.")
    }
}

const data = [
    { activity: 'coding', start: '0', end: '1'},
    { activity: 'coding', start: '5', end: '1'},
    { activity: 'coding', start: '0', end: '1'},
]

function Tracking(){
    username = useLoaderData().toString();
    const [startTime, setStartTime] = React.useState(new Date(0));
    const logStartTime = () => {
        console.log(startTime.getTime());
    }
    return (
        <div>
            <div className='Input'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="Start Time"
                        onChange={(time) => setStartTime(time)}
                        sx={{
                            display: 'block'
                        }}
                    />
                    <DateTimePicker
                        label="End Time"
                        onChange={(time) => setStartTime(time)}
                        sx={{
                            marginTop: '10px',
                            display: 'block'
                        }}
                    />
                </LocalizationProvider>
                
            </div>
            {
                data.map((activity) => <Activity name={activity.activity} start={activity.start} end={activity.end}/>)
            }
        </div>
        
    )
}

export default withAuthenticator(Tracking)