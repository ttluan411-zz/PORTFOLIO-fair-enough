import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../../../ducks/reducer'
import axios from 'axios';
import {List, ListItem} from 'material-ui/List';
import { Link } from 'react-router-dom';
import './EventList.css'
class EventList extends Component {
    componentDidMount(){
      this.props.getEvents()
    }
  render() {
    const styles = {
        width: '1000px',
        background: 'rgba(255,255,255,0.5)',
        boxShadow: '1px 1px 10px 1px rgba(0,0,0,0.4)',
        borderRadius: '10px',
        marginTop: '20px',
    };
    const {
      responseData
    } = this.props
    return(
      <div className="event-list">
        <div className="box">
        <List>
          {responseData.map((el,i) =>{
            return (
              <Link to={`/event/${el.eventid}`}>
              <ListItem
                style={styles}
                key={i}
                primaryText={el.eventname}
                secondaryText={el.eventdate}
              />
              </Link>

          )}
        )}
        </List>
        </div>
      </div>
    )
  }
}

export default connect((state) => {
  return state;
},{getEvents})(EventList);
