import React from 'react'
import GoogleLogin from "react-google-login"
import { useDispatch, useSelector } from 'react-redux';
import { selectSignedIn, setSignedIn, setUserData } from '../features/userSlice';
import homeicon from "../blog.png";
import "../styles/home.css"

const Homepage = () => {

    const isSignedIn=useSelector(selectSignedIn);

    const dispatch=useDispatch();

    const login=(response)=>{
        console.log(response);

        dispatch(setSignedIn(true));
        dispatch(setUserData(response.profileObj));
    }

    return (
        <div className="home__page" style={{display : isSignedIn ? "none" : ""}}>
            { !isSignedIn ?
                        <div className="login__page">
                        <img src={homeicon} class="home-icon"/>
                        <h1>A place to find articles about almost anything!</h1>
                        <GoogleLogin 
                            clientId="201565240964-3bd33lbnaih762rilp258f7q8fdo4blc.apps.googleusercontent.com"
                            render={(renderProps)=>(
                                <button 
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    className="login__button"
                                >
                                    Login With Google
                                </button>
                            )}
                            onSuccess={login}
                            onFailure={login}
                            isSignedIn={true}
                            cookiePolicy={"single_host_origin"}
                        />
                    </div>
                    : ""
                    }
        </div>
    )
}

export default Homepage
