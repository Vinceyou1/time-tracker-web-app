import './Tracking.css';
import { useLoaderData } from 'react-router-dom'
import { withAuthenticator } from '@aws-amplify/ui-react';
import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Activity from './Activity';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';

let username = null;

async function logActivity(startTime, endTime, activity){
    if(activity === "" || startTime.getTime() === 0 || endTime.getTime() === 0){
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
        "activity": activity,
        "start": String(startTime.getTime()),
        "end": String(endTime.getTime())
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

async function getData(setData){
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    
    // using built in JSON utility package turn object to string and store in a variable
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    let response = await fetch("https://eeae2o3zd6.execute-api.us-east-2.amazonaws.com/default?httpMethod=GET&username="+String(username), requestOptions);
    let json = await response.json();
    let items = json.body.data;
    let data = new Array(items.length);
    for(let i = 0; i < items.length; i++){
        data[i] = {};
        data[i]['activity'] = items[i]['Activity']['S'];
        data[i]['start'] = items[i]['Start']['N'];
        data[i]['end'] = items[i]['End']['N'];
        data[i]['index'] = parseInt(items[i]['Index']['N']);
    }
    setData(data);
}

function Tracking(){
    username = useLoaderData().toString();
    const [activity, setActivity] = React.useState("");
    const [startTime, setStartTime] = React.useState(new Date(0));
    const [endTime, setEndTime] = React.useState(new Date(0));
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        const fetchData = async () => {
            getData(setData);
        }
        // call the function
        fetchData()
        console.log("here")
    }, [])
    return (
        <div>
            <Stack className='Input' direction="row" spacing="1vw">
                <TextField id="outlined-basic" label="Activity" variant="outlined" onChange={(event) => setActivity(event.target.value)}/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="Start Time"
                        onChange={(time) => setStartTime(new Date(time))}
                    />
                    <DateTimePicker
                        label="End Time"
                        onChange={(time) => setEndTime(new Date(time))}
                    />
                </LocalizationProvider>
                <Button variant="contained" onClick={() => logActivity(startTime, endTime, activity)}>Log</Button>
                <Button variant='contained' onClick={() => getData(setData)}></Button>
            </Stack>
            {
                data.map((activity) => <Activity key={activity.index} name={activity.activity} start={activity.start} end={activity.end}/>)
            }
        </div>
        
    )
}

export default withAuthenticator(Tracking)