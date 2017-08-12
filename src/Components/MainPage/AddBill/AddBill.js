import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

const styles = {
  customWidth: {
    width: 150,
  },
};

/**
 * `SelectField` is implemented as a controlled component,
 * with the current selection set through the `value` property.
 * The `SelectField` can be disabled with the `disabled` property.
 */
export default class AddBill extends Component {
  state = {
    value: 1,
  };

  handleChange = (event, index, value) => this.setState({value});

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
          value={this.state.value}
          onChange={this.handleChange}
          style={styles.customWidth}
        >
          <MenuItem value={1} primaryText="$" />
          <MenuItem value={2} primaryText="€" />
          <MenuItem value={3} primaryText="£" />
          <MenuItem value={4} primaryText="¥" />
        </SelectField>
        <br />
        <SelectField
          floatingLabelText="Paid by"
          value={this.state.value}
          onChange={this.handleChange}
          style={styles.customWidth}
        >
          <MenuItem value={1} primaryText="You" />
          <MenuItem value={2} primaryText="George" />
          <MenuItem value={3} primaryText="Im" />
          <MenuItem value={4} primaryText="Mason" />
        </SelectField>
        <br />
        <SelectField
          floatingLabelText="Devide"
          value={this.state.value}
          onChange={this.handleChange}
          style={styles.customWidth}
        >
          <MenuItem value={1} primaryText="Equally" />
          <MenuItem value={2} primaryText="By shares" />
          <MenuItem value={3} primaryText="By %" />
        </SelectField>
      </div>
    );
  }
}
