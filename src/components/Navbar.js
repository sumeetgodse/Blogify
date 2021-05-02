import {Avatar} from "@material-ui/core"
import React, { useState } from 'react'
import { GoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from 'react-redux';
import { selectSignedIn, selectUserData, setInput, setSignedIn, setUserData } from '../features/userSlice';
import icon from "../blogger.png";
import "../styles/home.css"

const Navbar = () => {

    const isSignedIn=useSelector(selectSignedIn);
    const [inputValue,setInputValue]=useState("tech");
    const userData=useSelector(selectUserData);

    const dispatch=useDispatch();

    const logout=(response)=>{
        dispatch(setSignedIn(false));
        dispatch(setUserData(null));
    }

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(setInput(inputValue));
      };

    return (
        <div className="navbar">
            <img src={icon} class="navbar-icon"/>
            <h1 className="navbar__header">Blogify</h1>
            {isSignedIn &&
            <div className="blog__search">
                <input className="search" placeholder="Search for a blog" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} />
                <button className="submit-button" onClick={handleClick}>
                    Search
                </button>
            </div>}

            {isSignedIn ? 
            <div className="navbar__user__data">
                <Avatar src={userData?.imageUrl} alt={userData?.name} className="avatar" />
                <h1 className="signedIn">{userData?.givenName}</h1>
                <GoogleLogout 
                clientId="201565240964-3bd33lbnaih762rilp258f7q8fdo4blc.apps.googleusercontent.com"
                render={(renderProps)=>(
                    <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className="logout__button"
                    >
                        Logout
                    </button>
                )}
                onLogoutSuccess={logout}
                />
            </div>
            : <h6 className="notSignedIn">Login to start blogging!</h6>
            }
        </div>
    )
}

export default Navbar
