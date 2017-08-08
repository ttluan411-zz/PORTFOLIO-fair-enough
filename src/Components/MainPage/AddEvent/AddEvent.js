import React, {Component} from 'react';
import { connect } from 'redux';

class AddEvent extends Component {
    render(){
        const {
            eventInputValue,
            
        } = this.props;

        return(
            <div className ="add-event-wrapper">
                Add Event:
                <input type="text" value={eventInputValue} onChange={eventInput}/>
                <button onClick={()=> saveEvent(eventInputValue)}> Save </button>
            </div>
        )
    }
}