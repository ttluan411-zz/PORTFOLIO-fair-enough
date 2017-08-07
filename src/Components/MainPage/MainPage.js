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
                    <div className="balance-bar"></div>
                </div>
                <div className="mainpage-body"></div>
                <div className="mainpage-footer"></div>
            </div>
        )
    }
}