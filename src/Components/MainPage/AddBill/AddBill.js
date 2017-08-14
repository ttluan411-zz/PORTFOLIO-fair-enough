import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import { getFriends } from '../../../ducks/reducer';
import { connect } from 'react-redux';
import './AddBill.css'
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
    currency: null,
    paidUserId: null,
    devideMethod: null,
    values: []
  };



  componentDidMount(){
    this.props.getFriends()

  };

  handleChange1 = (event, index, value) => this.setState({currency: value});
  handleChange2 = (event, index, value) => this.setState({paidUserId: value});
  handleChange3 = (event, index, value) => this.setState({devideMethod: value});
  handleChange4 = (event, index, values) => this.setState({values});

  selectionRenderer = (values) => {
    switch (values.length) {
      case 0:
        return '';
      case 1:
        return this.props.friendList[0].givenname;
      default:
        return `${values.length} persons selected`;
    }
  }





  render() {
    const { friendList } = this.props
    console.log(this.state.values)
    return (
      <div className="addBill-wrapper">
        <TextField
          hintText="Hotel, Car Rental, etc..."
          floatingLabelText="Enter a bill"
        /><br />
        <TextField
          hintText="100.00"
          floatingLabelText="Enter amount"
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
          value={this.state.values}
          onChange={this.handleChange4}
          selectionRenderer={this.selectionRenderer}
        >
          {friendList.map((user,i) => (

            <MenuItem
              key={i}
              insetChildren={true}
              checked={this.state.values.indexOf(user.value) > -1}
              value={user.givenname}
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
          <MenuItem value={"By %"} primaryText="By %" />
        </SelectField>
        <div className="button-wrapper">
        <RaisedButton label="Cancel" style={button_style} />
        <RaisedButton label="Save" secondary={true} style={button_style} />
        </div>
      </div>
    );
  }
}
export default connect((state) => {
  return state;
},{getFriends})(AddBill);
