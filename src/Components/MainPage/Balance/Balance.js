import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import { getBalanceByEvent } from '../../../ducks/reducer';




 class Balance extends Component {
  constructor(props){
    super(props);


  }


  render(){
    const  {balance,getBalanceByEvent} = this.props
    console.log(this.props)
    return(
      <div className="Balance-wrapper">
        <List>
          {balance.map((el,i) => {
            return(
              <ListItem
                // leftAvatar={<Avatar src={} />}
                // rightIconButton={rightIconMenu}
                initiallyOpen={false}
                key={i}
                primaryText={el.friendname}
                secondaryText={el.balance} />
            )})}
          </List>
          <div className="button-div">
          <RaisedButton label="Full width" fullWidth={true} />
          </div>
      </div>



    )
  }
}
export default connect(state => {
  return state;
},{getBalanceByEvent})(Balance)
