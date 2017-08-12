import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer';
import './MainPage.css';
import AddEvent from './AddEvent/AddEvent';
import EventList from './EventList/EventList';

class MainPage extends Component {

  componentDidMount(){
    this.props.getUser()
  }
    render(){
      const{
        user
      } = this.props
      console.log(user)
        return (

            <div className="mainpage-wrapper">
                <div className="mainpage-header">
                    <div className="mainpage-logo">F A I R E N O U G H</div>
                    <div className="profile-box">
                      <img src={user.picture} />
                      <p>{!user.givenname ? null : user.givenname }</p>
                    </div>
                </div>
                <div className="mainpage-body">
                <AddEvent/>
                <EventList/>
                </div>
            </div>
        )
    }
}
export default connect((state) => {
  return state;
},{getUser})(MainPage);
