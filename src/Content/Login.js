import '@aws-amplify/ui/dist/styles.css';
import {Amplify} from 'aws-amplify';
import awsconfig from '../aws-exports';
import {withAuthenticator} from '@aws-amplify/ui-react'

Amplify.configure(awsconfig);

function Login(){
    window.location.replace("/");
}

export default withAuthenticator(Login);