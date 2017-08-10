import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import axios from 'axios';


export default class AddEvent extends Component {
  constructor(){
    super();
    this.state = {
      open: false,
      eventNameValue: '',
      date:''
    };
  }

  handleOpen = () => {
    console.log('clicked')
    this.setState({open: true});
  };

  handleClose = () => {
    // axios.post('/api/main', )
    this.setState({
      open: false
    });

  };
  handleChange =(e) => {
    this.setState({eventNameValue:e.target.value})
  }

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Create Event" onTouchTap={this.handleOpen} />
        <Dialog
          title="Create an Event"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        <TextField
          floatingLabelText="Enter event name"
          value={this.state.eventNameValue}
          onChange={this.handleChange}
        />
          <DatePicker hintText="Pick event date" container="inline" value={this.state.date} />
        </Dialog>
      </div>
    );
  }
}
