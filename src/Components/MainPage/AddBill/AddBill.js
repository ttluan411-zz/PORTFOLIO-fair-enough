import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

const styles = {
  customWidth: {
    width: 150,
  },
};

export default class AddBill extends Component {
  state = {
    value1: null,
    value2: null,
    value3: null,
  };

  handleChange1 = (event, index, value) => this.setState({value1: value});
  handleChange2 = (event, index, value) => this.setState({value2: value});
  handleChange3 = (event, index, value) => this.setState({value3: value});

  render() {
    return (
      <div>
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
          value={this.state.value1}
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
          value={this.state.value2}
          onChange={this.handleChange2}
          style={styles.customWidth}
        >
          <MenuItem value={"You"} primaryText="You" />
          <MenuItem value={'George'} primaryText="George" />
          <MenuItem value={'Im'} primaryText="Im" />
          <MenuItem value={'Mason'} primaryText="Mason" />
        </SelectField>
        {console.log(this.state.value2)}
        <br />
        <SelectField
          floatingLabelText="Devide"
          value={this.state.value3}
          onChange={this.handleChange3}
          style={styles.customWidth}
        >
          <MenuItem value={"Equally"} primaryText="Equally" />
          <MenuItem value={"By shares"} primaryText="By shares" />
          <MenuItem value={"By %"} primaryText="By %" />
        </SelectField>
      </div>
    );
  }
}
