import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../../../ducks/reducer'
import axios from 'axios';

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
        <ul>
          {responseData.map((el,i) =>
            <li key={i} >
              {el.eventname}, {el.eventtime}
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default connect((state) => {
  return state;
},{getEvents})(EventList);
