import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import route from './Router';
import {BrowserRouter as Router} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css'

export default class App extends Component {
  render() {
    injectTapEventPlugin()
    return (
      <MuiThemeProvider>
        <Router>
          <div className="App">
            {route}
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }

}
