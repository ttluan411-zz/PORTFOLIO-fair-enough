import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import Typist from 'react-typist';
import './Landing.css';

export default function Landing(props){
    return (
        <div className="landing-wrapper">
            <div className="header">F A I R E N O U G H</div>
            <div className="logobox">
            <Typist>
                    Animate text.
            </Typist>
                <div className="logo">

                     <img src="./Money-Icon.png" alt="logo"/>
                </div>
            </div>

            <div className="account">
            <a className="Login-button" href="http://localhost:3001/auth">
                <button className="log-in">
                    SIGN IN
                    {/*<div className="arrow-button"><img src="./a.png" alt="arrow"/></div>*/}
                </button>
            </a>

            </div>
        </div>
    )
}
