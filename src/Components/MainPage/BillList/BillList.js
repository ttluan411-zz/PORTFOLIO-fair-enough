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
      open: false
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
            console.log(el)
            return (
              <ListItem
                leftAvatar={<Avatar src={moneyAvatar} />}
                rightIconButton={rightIconMenu}
                initiallyOpen={true}
                primaryText={el.billsname}
                primaryTogglesNestedList={true}
                secondaryText={
                  <p>
                    <span style={{color: darkBlack}}>{el.createtime}</span><br/>
                    {el.amount}
                  </p>
                }
                secondaryTextLines={2}
                nestedItems={[
                  <ListItem
                    key={1}
                    primaryText="Starred"
                  />,
                  <ListItem
                    key={2}
                    primaryText="Sent Mail"
                    disabled={true}
                  />,
                  <ListItem
                    key={3}
                    primaryText="Inbox"
                    open={this.state.open}
                    onNestedListToggle={this.handleNestedListToggle}
                  />,
                ]}
              />
            )
          })}
          <Divider inset={true} />
        </List>
      </div>
    )
  }
}

export default connect(state => {
  return state;
},{getBills})(BillList);
