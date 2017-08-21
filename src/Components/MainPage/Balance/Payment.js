import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { getBalanceByEvent, getSettleList } from '../../../ducks/reducer';

class Payment extends Component {
  constructor(props){
    super(props);
    this.state = {
      isSettled: false
    }
  }

  onToken = (token) => {
      token.card = void 0;
      console.log('token', token);
      axios.post('http://localhost:3001/api/payment', { token, amount: 100 } ).then(response => {
        this.props.settleList.map((el,i) => {
          console.log('chay loop')
          return (
            axios.post(`/api/main/updateBalance/${this.props.eventSelected[0].eventid}/${el.lender}/${this.props.user.userid}/${el.sum}`)
            .then(res => {
              console.log('chay axios o day')
              this.setState({
                isSettled: true
              })
              this.props.getBalanceByEvent(this.props.eventSelected[0].eventid)
            })
          )
        })

        alert('abc')
      });
    }


    componentWillReceiveProps(props){
      console.log(props)
    }

    render() {
      const  {balance,getBalanceByEvent, user, settleList, friendList } = this.props
      return (
        <div>
        <div className="Your-balance">
          {!this.state.isSettled ? settleList.map((el,i) => {
            let lender = el.lender

            return (
              <ul>
                <li>
                  You owes {lender}: ${el.sum}
                </li>
              </ul>
            )
          }) : null}
        </div>
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

export default connect(state => {
  return state;
},{getBalanceByEvent,getSettleList})(Payment)
