import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import { connect } from 'redux';
import './MainPage.css';


export default class MainPage extends Component {
    constructor(){
        super();
        

    }
    render(){
        return (
            <div className="mainpage-wrapper">
                <div className="mainpage-header">
                    <div className="mainpage-logo">F A I R E N O U G H</div>
                    <div className="balance-bar">
                        <div className="small-box">
                            <div className="top-letters">You owe:</div>
                            <div className="bottom-letters">$0.00</div>
                        </div>
                        <div className="small-box middle">
                            <div className="top-letters">You are owed:</div>
                            <div className="bottom-letters">$0.00</div>
                        </div>
                        <div className="small-box">
                            <div className="top-letters">Balance:</div>
                            <div className="bottom-letters">$0.00</div>
                        </div>
                    </div>
                </div>
                <div className="mainpage-body"></div>
                <div className="mainpage-footer">
                    <button className="add-button"></button>
                </div>
            </div>
        )
    }
}