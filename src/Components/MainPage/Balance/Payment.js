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
      axios.post('http://localhost:3001/api/payment', { token, amount: 100 } ).then(response => {
        alert('Thank you! Your payment has been posted')
        // axios.post('')
        //
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
          <RaisedButton label="Settle balance" fullWidth={true} />
          </StripeCheckout>
        </div>
      );
    }


}
