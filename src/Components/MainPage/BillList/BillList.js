import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getBills } from '../../../ducks/reducer';
import {List, ListItem} from 'material-ui/List';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';

import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import moneyAvatar from './images.png';

class BillList extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: true,
    };
  }

  handleNestedListToggle = (item) => {
    this.setState({
      open: item.state.open,
    });
  };

  componentDidMount(){
    this.props.getBills(this.props.eventId)
  }


  render(){
    console.log(this.props)
    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Delete</MenuItem>
      </IconMenu>
    );
    return (
      <div className="billList-wrapper">
        <List>
          {this.props.billList.map((el,i) => {
            return (
              <ListItem
                leftAvatar={<Avatar src={moneyAvatar} />}
                rightIconButton={rightIconMenu}
                initiallyOpen={false}
                key={i}
                primaryText={el.bills.billsname}
                primaryTogglesNestedList={true}
                secondaryText={
                  <p>
                    <span style={{color: darkBlack}}>{el.bills.createtime}</span><br/>
                    {el.bills.amount}
                  </p>
                }
                secondaryTextLines={2}
                nestedItems={[
                  el.bills.nestedlist.map((transaction,index) => {

                    let borrowerId =transaction.borrowerid
                    let lenderId =transaction.lenderid
                    let borrower = this.props.friendList.filter((e)=> e.userid == borrowerId)[0]
                    let lender = this.props.friendList.filter((e)=> e.userid == lenderId)[0]
                    return(
                        <ListItem
                          key={index}
                          secondaryText={
                            <p>
                             {borrower.givenname} owes {lender.givenname} : {transaction.amount}
                           </p>
                          }
                        />
                    )
                  })
                ]}
              />
            )
          })}
        </List>
        <Divider inset={true} />
      </div>
    )
  }
}

export default connect(state => {
  return state;
},{getBills})(BillList);
