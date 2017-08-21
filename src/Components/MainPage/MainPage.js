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
      const style = {
        marginRight: 20,
      };
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
                      <p>Hi {!user.givenname ? null : user.givenname }!</p>
                      <div className="balance-info">
                        <div className="info"></div>
                        <div className="info"></div>
                        <div className="info"></div>
                      </div>
                    </div>

                </div>
                <div className="mainpage-body">
                  <div className="create-event-button">
                    <AddEvent/>
                  </div>
                <EventList/>
                </div>
            </div>
        )
    }
}
export default connect((state) => {
  return state;
},{getUser})(MainPage);
