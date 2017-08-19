import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';

export default class Payment extends Component {
  constructor(props){
    super(props);
  }

  onToken = (token) => {
      token.card = void 0;
      console.log('token', token);
      axios.post('http://localhost:3535/api/payment', { token, amount: 100 } ).then(response => {
        alert('we are in business')
      });
    }


    componentWillReceiveProps(props){
      console.log(props)
    }

    render() {
      return (
        <div>
          <StripeCheckout
            token={this.onToken}
            stripeKey={ 'pk_test_qXoP227DvOgZzVEIhx0OqSLG' }
            amount={10345}
            currency={'USD'}
            locale="auto"
          >
          <RaisedButton label="Make payment" fullWidth={true} />
          </StripeCheckout>

        </div>
      );
    }


}
