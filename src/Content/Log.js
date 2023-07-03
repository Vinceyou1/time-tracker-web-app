import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { useLoaderData } from 'react-router-dom';
import { withAuthenticator } from '@aws-amplify/ui-react';
//var CanvasJSReact = require('@canvasjs/react-charts');

let username = null;
function user(){
    const lastAuthUserKey = 'CognitoIdentityServiceProvider.3j6k22tm9ql3b2jr497qs5250e.LastAuthUser';
    return localStorage.getItem(lastAuthUserKey);
}

async function getChartData(setData){
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    
    console.log('here')
    
    // using built in JSON utility package turn object to string and store in a variable
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    let response = await fetch("https://eeae2o3zd6.execute-api.us-east-2.amazonaws.com/default?httpMethod=GET&username="+String(username), requestOptions);
    let json = await response.json();
    let items = json.body.data;
    let data = {};
    let total_time = 0;
    for(let i = 0; i < items.length; i++){
        let time = parseInt(items[i]['End']['N']) - parseInt(items[i]['Start']['N']);
        if(data[items[i]['Activity']['S']] == null) data[items[i]['Activity']['S']] = 0;
        data[items[i]['Activity']['S']] += time;
        total_time += time;
    }
    let chartData = [];
    for(var key in data){
        chartData.push({y: Math.round(100*(data[key] / total_time)), label: key});
    }
    console.log(data)
    setData(chartData);
}

function Showcase(){
    let userdata = useLoaderData();
    if(userdata == null) {
        username = user();
    }
    else username = userdata.toString();
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        const fetchData = async () => {
            getChartData(setData);
        }
        // call the function
        fetchData()
    }, [])
    const options = {
        backgroundColor: "rgba(0,0,0,0)",
        fontColor: "white",
        animationEnabled: true,
        title: {
            text: ""
        },
        data: [{
            indexLabelFontColor: "white",
            type: "pie",
            startAngle: 75,
            toolTipContent: "<b>{label}</b>: {y}%",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: data
        }]
    }
    return (
    <div>
        <CanvasJSChart options = {options}
            /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
    );
}

export default withAuthenticator(Showcase)