import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import { getFriends, getBills, getUserEmails } from '../../../ducks/reducer';
import { connect } from 'react-redux';
import './AddBill.css';
import axios from 'axios';
import moment from 'moment';
import AutoComplete from 'material-ui/AutoComplete';
// import SearchBar from 'material-ui-search-bar';

const styles = {
  customWidth: {
    width: 200,
  },
};
const button_style = {
  margin: 12,
};
class AddBill extends Component {

  state = {
    billName: '',
    amount: '',
    currency: '',
    paidUserId: '',
    devideMethod: '',
    date: '',
    sharingFriend: [],
    eventId: this.props.eventId,
    isSettled: false,
    inputValue: '',

  };

  componentDidMount(){
    this.props.getUserEmails()
    this.props.getFriends()
  };
  handleChangeBillName =(e) => { this.setState({billName:e.target.value}) };
  handleChangeBillAmount =(e) => { this.setState({amount:e.target.value}) }
  handleChange1 = (event, index, value) => this.setState({currency: value});
  handleChange2 = (event, index, value) => this.setState({paidUserId: value});
  handleChange3 = (event, index, value) => this.setState({devideMethod: value});
  handleChange4 = (event, index, sharingFriend) => {
    this.setState({sharingFriend});
  };
  handleDateSubmit = (x,date) => { this.setState({date}) }
  handleSaveBill = () => {
    console.log('axios toi roi ne')
    axios.post('/api/main/createBill', this.state)
    .then((res) => {
      this.props.onSave(2);
      console.log(res)
      this.props.getBills(this.state.eventId);
    })
  }


  selectionRenderer = (sharingFriend) => {
    // console.log('here friend',sharingFriend)
    switch (sharingFriend.length) {
      case 0:
        return '';
      default:
        return `${sharingFriend.length} persons selected`;
    }
  }

  render() {
    const { friendGroup } = this.props
    // console.log(friendGroup)
    return (
      <div className="addBill-wrapper">
        <TextField
          hintText="Hotel, Car Rental, etc..."
          floatingLabelText="Enter a bill"
          value={this.state.billName}
          onChange={this.handleChangeBillName}
        /><br />
        <TextField
          hintText="100.00"
          floatingLabelText="Enter amount"
          value={this.state.amount}
          onChange={this.handleChangeBillAmount}
        /><br />
        <SelectField
          floatingLabelText="Currency"
          value={this.state.currency}
          onChange={this.handleChange1}
          style={styles.customWidth}
        >
          <MenuItem value={"$"} primaryText="$" />
          <MenuItem value={"€"} primaryText="€" />
          <MenuItem value={"£"} primaryText="£" />
          <MenuItem value={"¥"} primaryText="¥" />
        </SelectField><br />
        <SelectField
          floatingLabelText="Paid by"
          value={this.state.paidUserId}
          onChange={this.handleChange2}
          style={styles.customWidth}
        >
        {friendGroup.map((el,i)=> {
          return (
            <MenuItem key={i} value={el.userid} primaryText={el.givenname} />
          )
        })}
        </SelectField>
        <br />

        <SelectField
          multiple={true}
          hintText="Select name"
          value={this.state.sharingFriend}
          onChange={this.handleChange4}
          selectionRenderer={this.selectionRenderer}
        >
          {friendGroup.map((user,i) => (
            <MenuItem
              key={i}
              insetChildren={true}
              checked={this.state.sharingFriend.indexOf(user.value) > -1}
              value={user.userid}
              primaryText={user.givenname}
            />
          ))}
        </SelectField>
        <SelectField
          floatingLabelText="Divide"
          value={this.state.devideMethod}
          onChange={this.handleChange3}
          style={styles.customWidth}
        >
          <MenuItem value={"Equally"} primaryText="Equally" />
          <MenuItem value={"By shares"} primaryText="By shares" />
        </SelectField>
        <br/>
        <DatePicker
          className="date-input"
          hintText="Pick date"
          container="inline"
          value={this.state.date}
          onChange={(x,date)=>{ this.handleDateSubmit(x,date) }}
        />
        <div className="button-wrapper">
        <RaisedButton label="Cancel" style={button_style} />
        <RaisedButton label="Save" secondary={true} style={button_style} onClick={this.handleSaveBill}  />
        </div>
      </div>
    );
  }
}
export default connect((state) => {
  return state;
},{getFriends, getBills, getUserEmails})(AddBill);
