import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import Typist from 'react-typist';
import Features from './Features';
import './Landing.css';
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
          avgTypingDelay={50}
          startDelay={1500}
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

      <div className="features-box">
        <div className="features-header">
          <h1>FEATURES</h1>
          <div className="line"></div>
        </div>
        <div className="box left">
          <h2>We are fairness experts</h2>
          <div className="divider"></div>
          <img src={require('./deal.svg')}/>
          <p>Split household bills with roommates, figure out costs for a group trip, remember when a friend spots you for lunch.</p>
        </div>
        <div className="box mid">
          <h2>We do the math for you</h2>
          <div className="divider"></div>
          <img src={require('./monitor.svg')}/>
          <p>Our algorithm computes the minimum number of transactions to pay effectively each person.</p>
        </div>
        <div className="box right">
          <h2>And it is free, forever!</h2>
          <div className="divider"></div>
          <img src={require('./diamond.svg')}/>
          <p>Fairenough keeps a running total over time, so you can pay each other back in one big payment, instead of a bunch of small ones.</p>
        </div>
      </div>
    </div>
    )
  }
}

//
// <div class="wrapper">
//   <a href="#" class="btn">Hover Me</a>
// </div>
