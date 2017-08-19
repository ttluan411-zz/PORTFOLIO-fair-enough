import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import SearchBar from 'material-ui-search-bar';
import { searchUserByEmail } from '../../../ducks/reducer';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

class AddFriend extends Component {
  constructor(props){
    super(props);



    this.state = {
       inputText: '',
       friendsGoing: []
     };
     this.handleChange = this.handleChange.bind(this)
     this.handleClick = this.handleClick.bind(this)
     this.handleTouchTap = this.handleTouchTap.bind(this)
     this.handleSwitchTap = this.handleSwitchTap.bind(this)
   }



      handleChange(e){
        this.setState({
          inputText: e
        })
      }
      handleClick(){
        this.state.friendsGoing.push(this.state.inputText)
        this.props.searchUserByEmail(this.state.inputText, this.props.eventSelected[0].eventid, this.props)
        this.setState({
          inputText:''
        })
      }
      handleTouchTap(){
        console.log('clicked')
      }
      handleRequestDelete(){
        console.log('delete')
      }
      handleSwitchTap(){
        this.props.onSave(1);
      }


    render() {
      const styles = {
        chip: {
          margin: 8,
        }
      }
      console.log(this.props.friendGroup)
      return(
        <div>
        <SearchBar
          dataSource = {this.props.userEmails}
          value = {this.state.inputText}
          onChange={this.handleChange}
          onRequestSearch={() => console.log('onRequestSearch')}
          style={{
           margin: '10px auto',
           maxWidth: 600
          }}
        />
        {this.props.friendGroup.map((el,i) => {
          return (
          <Chip
           key={i}
           onRequestDelete={this.handleRequestDelete}
           onClick={this.handleTouchTap}
           style = {styles.chip}
           >
           <Avatar src={el.picture} />
           {el.givenname} {el.familyname}
         </Chip>
       )
       })}
       <RaisedButton label="Add" primary={true} onClick={this.handleClick}/>
       <RaisedButton label="Done" secondary={true}  onClick={this.handleSwitchTap} />
        </div>
       )
    }

}

export default connect(state => {
  return state;
},{searchUserByEmail})(AddFriend);
