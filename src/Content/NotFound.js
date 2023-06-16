import '@aws-amplify/ui/dist/styles.css';
import './NotFound.css'


function NotFound(){
    return(<div id='error_page'>
        <h1 id='error_number'>404</h1>
        <p id='error_message'>This link doesn't seem to be working</p>
        <></>
    </div>
    )
}

export default NotFound;