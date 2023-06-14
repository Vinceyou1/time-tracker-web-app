import React from 'react';
import './App.css';
import '@aws-amplify/ui/dist/styles.css';
import {Link} from 'react-router-dom'
import {Amplify, Auth, Hub} from 'aws-amplify';
import awsconfig from './aws-exports';
import {withAuthenticator} from '@aws-amplify/ui-react'

Amplify.configure(awsconfig);

function Login({user}){
    window.location.replace("/")
    Hub.dispatch('user', user);
}

export default withAuthenticator(Login);