import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import Typist from 'react-typist';
import './Landing.css';

export default function Landing(props){
    return (
        <div className="landing-wrapper">
            <div className="header">F A I R E N O U G H</div>
            <div className="logobox">
              <Typist
                className="auto-type"
                avgTypingSpeed={1}
                startDelay={2500}
              >
                  Takes the trouble out of sharing expenses with anyone.
              </Typist>

            </div>
            <div className="button-box">
              <div className="shadow"></div>
              <a className="Login-button" href="http://localhost:3001/auth">
                  <div className="log-in">
                      GET STARTED
                  </div>
                  // <div class="wrapper">
                  //   <a href="#" class="btn">Hover Me</a>
                  // </div>
              </a>
            </div>
            <div className="service-box">
              <div className="box 1"></div>
              <div className="box 2"></div>
              <div className="box 3"></div>
            </div>
        </div>
    )
}
