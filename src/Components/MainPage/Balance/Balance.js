import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import { getBalanceByEvent } from '../../../ducks/reducer';

 class Balance extends Component {
  constructor(props){
    super(props);


  }

  render(){
    const  {getBalanceByEvent} = this.props
    return(
      <div className="Balance-wrapper">
        <List>
        
        </List>
      </div>



    )
  }
}
export default connect(state => {
  return state;
},{getBalanceByEvent})(Balance)
