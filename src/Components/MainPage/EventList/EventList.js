import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../../../ducks/reducer'
import axios from 'axios';
import {List, ListItem} from 'material-ui/List';

class EventList extends Component {
    componentDidMount(){
      this.props.getEvents()
    }
  render() {
    const {
      responseData
    } = this.props;
    return(
      <div className="event-list">

        <List
          {responseData.map((el,i) =>{
            return (
              <ListItem
                key={i}
                primaryText={el.eventname}
                secondaryText={el.eventtime}
              />
          })})
        </List>
      </div>
    )
  }
}

export default connect((state) => {
  return state;
},{getEvents})(EventList);
