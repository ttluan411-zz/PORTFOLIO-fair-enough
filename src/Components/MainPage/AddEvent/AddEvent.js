import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { getEvents } from '../../../ducks/reducer';
import { connect } from 'react-redux';
import moment from 'moment';

class AddEvent extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      eventNameValue: '',
      date: null
    };
  }

  handleOpen = () => {

    this.setState({open: true});
  };

  handleClose = () => {
    axios.post('/api/main/createEvent', {eventname:this.state.eventNameValue, eventdate:moment(this.state.date).format("MMM Do YY")}).then(res => {
      this.props.getEvents()
    })
    this.setState({
      open: false,
      eventNameValue: '',
      date: ''
    });


  };
  handleChange =(e) => {
    this.setState({eventNameValue:e.target.value})
  }
  handleDateSubmit = (x,date) => {
    this.setState({date: date})
    console.log(this.state.date)
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
    console.log(this.state)
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
          className="event-input"
          floatingLabelText="Enter event name"
          value={this.state.eventNameValue}
          onChange={this.handleChange}
        />
          <DatePicker
            className="date-input"
            hintText="Pick event date"
            container="inline"
            value={this.state.date}
            onChange={(x,date)=>{ this.handleDateSubmit(x,date) }}
          />
        </Dialog>
      </div>
    );
  }
}
export default connect((state) => {
  return state;
},{getEvents})(AddEvent);
