import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { selectEvent } from '../../../ducks/reducer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import AddBill from '../AddBill/AddBill';
import {Tabs, Tab} from 'material-ui/Tabs';
import './EventItem.css';
class EventItem extends Component {
  componentDidMount(){
    this.props.selectEvent(this.props.match.params.id)
  }
  handleTouchTap = () => {
    console.log('abc')
  }



  render (){
    const {
      responseData
    } = this.props

    const styles = {
      title: {
        cursor: 'pointer'
      }
    }
    console.log( responseData[0] )
    return(
      <div className="eventItem-wrapper">
      <AppBar
        title={ <span style={styles.title} >{!responseData[0] ? null :responseData[0].eventname } </span> }
        iconElementLeft={<IconButton><NavigationClose /></IconButton>}
        iconElementRight={<FlatButton label="Edit" />}
      />
      <div className="addBill-wrapper">
      <AddBill/>
      </div>
      </div>
    )
  }
}
export default connect((state) => {
  return state;
},{selectEvent})(EventItem);
