import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../../../ducks/reducer'
import axios from 'axios';
import {List, ListItem} from 'material-ui/List';
import { Link } from 'react-router-dom';
class EventList extends Component {
    componentDidMount(){
      this.props.getEvents()
    }
  render() {
    const {
      responseData
    } = this.props
    return(
      <div className="event-list">
        <List>
          {responseData.map((el,i) =>{
            return (
              <Link to={`/event/${el.eventid}`}>
              <ListItem
                // onClick={}
                key={i}
                primaryText={el.eventname}
                secondaryText={el.eventdate}
              />
              </Link>

          )}
        )}
        </List>
      </div>
    )
  }
}

export default connect((state) => {
  return state;
},{getEvents})(EventList);
