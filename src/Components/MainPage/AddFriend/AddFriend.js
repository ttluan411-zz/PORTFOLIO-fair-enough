import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import SearchBar from 'material-ui-search-bar';
import { searchUserByEmail } from '../../../ducks/reducer';

class AddFriend extends Component {
  constructor(props){
    super(props);



    this.state = {
       inputText: ''
     };
     this.handleChange = this.handleChange.bind(this)
     this.handleClick = this.handleClick.bind(this)
   }



      handleChange(e){
        this.setState({
          inputText: e
        })
      }
      handleClick(){
        this.props.searchUserByEmail(this.state.inputText)
        this.setState({
          inputText:''
        })
      }

    render() {
      console.log(this.props.userEmails)
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
        <RaisedButton label="Add" secondary={true} onClick={this.handleClick}/>
        <RaisedButton label="Done" primary={true} />
        </div>
       )
    }

}

export default connect(state => {
  return state;
},{searchUserByEmail})(AddFriend);
