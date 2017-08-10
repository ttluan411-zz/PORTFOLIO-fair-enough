import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer';
import './MainPage.css';
import AddEvent from './AddEvent/AddEvent'

class MainPage extends Component {

  componentDidMount(){
    // console.log(this.props.getUser())
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
                      <p>{!user.name ? null : user.name.givenName}</p>
                    </div>
                    <div className="balance-bar">
                        <div className="small-box">
                            <div className="top-letters">You owe:</div>
                            <div className="bottom-letters">$0</div>
                        </div>
                        <div className="small-box middle">
                            <div className="top-letters">You are owed:</div>
                            <div className="bottom-letters">$0</div>
                        </div>

                        <div className="small-box">
                            <div className="top-letters">Balance:</div>
                            <div className="bottom-letters">$0</div>
                        </div>
                    </div>
                </div>
                <div className="mainpage-body">
                <AddEvent/>
                </div>
            </div>
        )
    }
}
export default connect((state) => {
  return state;
},{getUser})(MainPage);
