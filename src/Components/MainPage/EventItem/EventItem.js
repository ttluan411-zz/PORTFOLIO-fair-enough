import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { selectEvent } from '../../../ducks/reducer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import AddBill from '../AddBill/AddBill';
import BillList from '../BillList/BillList';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import './EventItem.css';
class EventItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
       slideIndex: 0
    };
  }
  componentDidMount(){
    this.props.selectEvent(this.props.match.params.id)
  }
  handleTouchTap = () => {
    // console.log('abc')
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render (){
    const {
      responseData
    } = this.props

    const styles = {
      title: {
        cursor: 'pointer'
      }
    }
    // console.log( responseData, this.props.match.params.id)
    const eventId = this.props.match.params.id;
    return(
      <div className="eventItem-wrapper">
      <AppBar
        title={ <span style={styles.title} >{!responseData[0] ? null :responseData[0].eventname } </span> }
        iconElementLeft={<IconButton><NavigationClose /></IconButton>}
        iconElementRight={<FlatButton label="Edit" />}
      />

        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab label="Add Expenses" value={0} />
          <Tab label="Expense List" value={1} />
          <Tab label="Balance" value={2} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div className="addBill-wrapper">
            <AddBill eventId={eventId} onSave={this.handleChange}/>
          </div>
          <div>
            <BillList eventId={eventId} />
          </div>
          <div>
            slide n°3
          </div>
        </SwipeableViews>
      </div>
    )
  }
}
export default connect((state) => {
  return state;
},{selectEvent})(EventItem);
