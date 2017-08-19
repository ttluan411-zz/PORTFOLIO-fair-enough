import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import Typist from 'react-typist';
import Features from './Features';
import './Landing.css';
import './Hey-World.mp4';
import './Features.css';

export default class Landing extends Component {
  constructor (props) {
        super(props);

    }

    render(){
    return (
      <div className="landing-wrapper">
      <div className="universe"></div>
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
              </a>
            </div>
    </div>
    )
  }
}

//
// <div class="wrapper">
//   <a href="#" class="btn">Hover Me</a>
// </div>
