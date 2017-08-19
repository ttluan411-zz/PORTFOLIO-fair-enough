import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import route from './Router';
import {BrowserRouter as Router} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {pinkA200,cyan400, grey800, cyan600 } from 'material-ui/styles/colors';
import './App.css'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: cyan600,
    primary2Color: cyan400,
    accent1Color: pinkA200,
    pickerHeaderColor: cyan400,
  },
  appBar: {
    height: 50
  },
  tabs:{
    backgroundColor: cyan400
  },
  button: {
    height: 36,
    minWidth: 200,
  }
});

export default class App extends Component {
  render() {
    injectTapEventPlugin()
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Router>
          <div className="App">
            {route}
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }

}
