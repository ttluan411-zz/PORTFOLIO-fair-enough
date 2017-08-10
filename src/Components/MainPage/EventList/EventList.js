import React, {Component} from 'react';
import axios from 'axios';

export default class EventList extends Component {
    constructor(){
      super();
      this.state = {
        responseData: []
      }


    }
    componentDidMount(){
      axios.get('/api/main/getEvent').then(res => {
        this.setState({
          responseData: res.data
        })
      })
    }

  render(){
    return(
      <div>
        <ul>
          {this.state.responseData.map((event,i) =>
            <li key={i} >
              {event.eventname}, {event.eventtime}
            </li>
          )}
        </ul>
      </div>
    )

  }
}
