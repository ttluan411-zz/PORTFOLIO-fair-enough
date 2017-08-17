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
    friendGroup: [],
    eventId: this.props.eventId,
    isSettled: false,
    inputValue: ''
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
  handleChange4 = (event, index, friendGroup) => {
    this.setState({friendGroup});
    axios.post('/api/main')
  };
  handleDateSubmit = (x,date) => { this.setState({date}) }
  handleSaveBill = () => {
    axios.post('/api/main/createBill', this.state).then(res=> console.log(res))
    .then(() => {
      this.props.onSave(1);
      console.log('here')
      this.props.getBills(this.state.eventId);
    })
  }


  selectionRenderer = (friendGroup) => {
    switch (friendGroup.length) {
      case 0:
        return '';
      case 1:
        return friendGroup[0];
      default:
        return `${friendGroup.length} persons selected`;
    }
  }

  render() {
    const { friendList } = this.props
    console.log(this.props.userEmails)
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
        </SelectField>
        <br />
        <AutoComplete
          floatingLabelText="Search friends by emails"
          filter={AutoComplete.fuzzyFilter}
          dataSource={this.props.userEmails}
          maxSearchResults={2}
          onNewRequest={this.handleChooseUser}
        />

        <SelectField
          floatingLabelText="Paid by"
          value={this.state.paidUserId}
          onChange={this.handleChange2}
          style={styles.customWidth}
        >
        {friendList.map((el,i)=> {
          return (
            <MenuItem key={i} value={el.userid} primaryText={el.givenname} />
          )
        })}
        </SelectField>
        <br />

        <SelectField
          multiple={true}
          hintText="Select a name"
          value={this.state.friendGroup}
          onChange={this.handleChange4}
          selectionRenderer={this.selectionRenderer}
        >
          {friendList.map((user,i) => (
            <MenuItem
              key={i}
              insetChildren={true}
              checked={this.state.friendGroup.indexOf(user.value) > -1}
              value={user.userid}
              primaryText={user.givenname}
            />
          ))}
        </SelectField>
        <SelectField
          floatingLabelText="Devide"
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
