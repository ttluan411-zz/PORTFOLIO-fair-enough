import React, { Component } from 'react';
import route from './Router';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css'

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {route}
        </div>
      </Router>
    )
  }
}
