import React from 'react';
import '@aws-amplify/ui/dist/styles.css';
import './Header.css';
import {Amplify, Auth, Hub} from 'aws-amplify';
import awsconfig from './aws-exports';
import {withAuthenticator} from '@aws-amplify/ui-react'
import {Link} from 'react-router-dom'


function Header(){
    return(
        <div className='Header'>
            <ul className='leftHeader'>
                <li><Link to="login">Home</Link></li>
                <li>Showcase</li>
                <li>My time</li>
            </ul>
        </div>
    );
}

export default Header