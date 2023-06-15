import './App.css';
import '@aws-amplify/ui/dist/styles.css';
import {Amplify, Auth, Hub} from 'aws-amplify';
import awsconfig from './aws-exports';
import {withAuthenticator} from '@aws-amplify/ui-react'

Amplify.configure(awsconfig);

function Login({user}){
    localStorage.setItem("username", user.username)
    window.location.replace("/");
}

export default withAuthenticator(Login);