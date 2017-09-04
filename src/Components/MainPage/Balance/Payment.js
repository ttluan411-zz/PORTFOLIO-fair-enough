import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { getBalanceByEvent, getSettleList } from '../../../ducks/reducer';
import {red400} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
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
      axios.post('/api/payment', { token, amount: 100 } ).then(response => {
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
        axios.delete(`/api/main/deleteTransaction/${this.props.eventSelected[0].eventid}/${this.props.user.userid}`)
      });
    }


    componentWillReceiveProps(props){
      console.log(props)
    }

    render() {
      console.log(this.props)
      const  {balance,getBalanceByEvent, user, settleList, friendList } = this.props
      let total = 0.00
      return (
        <div>
        <div className="Your-balance">
        <List>
          {!this.state.isSettled ? settleList.map((el,i) => {
            console.log(total, el.sum)
            total += parseInt(el.sum)
            let lenderid = el.lender
            let lender = friendList.filter((e)=> e.userid == lenderid)[0]
            console.log(lender)
            return (
                <ListItem>
                  <p>You owes {lender.givenname} : </p><p style={{color:"#01e0df"}}> ${el.sum}</p>
                </ListItem>

            )
          }) : null}
        </List>
        </div>
          <StripeCheckout
            token={this.onToken}
            stripeKey={ 'pk_test_qXoP227DvOgZzVEIhx0OqSLG' }
            amount={total * 100}
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
