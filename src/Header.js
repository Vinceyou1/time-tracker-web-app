import React from 'react';
import '@aws-amplify/ui/dist/styles.css';
import './Header.css';
import {Amplify, Auth, Hub} from 'aws-amplify';
import awsconfig from './aws-exports';
import {withAuthenticator} from '@aws-amplify/ui-react'
import {Link, Outlet, useLoaderData} from 'react-router-dom'

function signout(){
    localStorage.removeItem("username");
    Hub.dispatch('reload');
    window.location.reload();
}


function Header(){
    if(useLoaderData() != null){
        return(
            <>
                <div className='Header'>
                    <ul className='leftHeader'>
                        <li>Showcase</li>
                        <li>My time</li>
                    </ul>
                    <Link onClick={signout} className='Logout' >Log Out</Link>
                </div>
                <Outlet />
            </>
        );
    }
    else{
        return(
            <>
                <div className='Header'>
                    <ul className='leftHeader'>
                        <li>Showcase</li>
                        <li>My time</li>
                    </ul>
                    <Link to='/login' className='Login'>Log in/Register</Link>
                </div>
                <Outlet />
            </>
        );
    }   
}

export default Header