import React, { Component } from 'react';
import route from './Router';
import {HashRouter} from 'react-router-dom';
import './App.css'

export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          {route}
        </div>
      </HashRouter>
    )
  }
}



