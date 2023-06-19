import React from 'react';
import '@aws-amplify/ui/dist/styles.css';
import './Header.css';
import {Link, Outlet, useLoaderData, NavLink} from 'react-router-dom'
import {Auth} from 'aws-amplify'

async function signout(){
    const lastAuthUserKey = 'CognitoIdentityServiceProvider.3j6k22tm9ql3b2jr497qs5250e.LastAuthUser';
    localStorage.removeItem(lastAuthUserKey);
    Auth.signOut().then(console.log("signed out")).then(window.location.reload());
    
}

function Header(){
    if(useLoaderData() != null){
        return(
            <>
                <div className='Header'>
                    <NavLink to="/" className={({isActive}) => "nav-link" + (!isActive ? " unselected" : " selected")}>
                        <li>Home</li>
                    </NavLink>
                    <NavLink to="/showcase" className={({isActive}) => "nav-link" + (!isActive ? " unselected" : " selected")}>
                        <li>Showcase</li>
                    </NavLink>
                    <NavLink to="/track" className={({isActive}) => "nav-link" + (!isActive ? " unselected" : " selected")}>
                        <li>Tracking</li>
                    </NavLink>
                    <NavLink to="/log" className={({isActive}) => "nav-link" + (!isActive ? " unselected" : " selected")}>
                        <li>Log</li>
                    </NavLink>
                    <div className='login-div'><Link onClick={signout} className='Login' >Log Out</Link></div>
                </div>
                <Outlet />
            </>
        );
    }
    else{
        return(
            <>
                <div className='Header'>
                    <NavLink to="" className={({isActive}) => "nav-link" + (!isActive ? " unselected" : " selected")}>
                        <li>Home</li>
                    </NavLink>
                    <NavLink to="/showcase" className={({isActive}) => "nav-link" + (!isActive ? " unselected" : " selected")}>
                        <li>Showcase</li>
                    </NavLink>
                    <div className='login-div'><Link to='/login' className='Login' >Log in/Register</Link></div>
                </div>
                <Outlet />
            </>
        );
    }   
}

export default Header