import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {List, ListItem} from 'material-ui/List';

import { getBalanceByEvent } from '../../../ducks/reducer';
import {Bar} from 'react-chartjs-2';
import Payment from './Payment';




 class Balance extends Component {
  constructor(props){
    super(props);

    this.state = {
      chartData: {
        labels: [],
        datasets: [
          {
            label:['Balance'],
            data: [],
            backgroundColor: [
              'rgb(1, 224, 223)',
              'rgb(1, 224, 223)',
              'rgb(1, 224, 223)',
              'rgb(1, 224, 223)',
              'rgb(1, 224, 223)',
              'rgb(1, 224, 223)',
              'rgb(1, 224, 223)',
              'rgb(1, 224, 223)'
            ]
          },
          {
            label:['Borrowed'],
            data: [],
            backgroundColor: [
              'rgb(248, 150, 208)',
              'rgb(248, 150, 208)',
              'rgb(248, 150, 208)',
              'rgb(248, 150, 208)',
              'rgb(248, 150, 208)',
              'rgb(248, 150, 208)',
              'rgb(248, 150, 208)',
              'rgb(248, 150, 208)'
            ]
          },{
            label:['Lent'],
            data: [],
            backgroundColor: [
              'rgb(151, 113, 254)',
              'rgb(151, 113, 254)',
              'rgb(151, 113, 254)',
              'rgb(151, 113, 254)',
              'rgb(151, 113, 254)',
              'rgb(151, 113, 254)',
              'rgb(151, 113, 254)',
              'rgb(151, 113, 254)'
            ]
          }
        ]
      }
    }

  }

 componentWillReceiveProps(nextprops){
   console.log(nextprops)
    const labels = []
     ,balance = []
     ,borrowed = []
     ,lent = []

     nextprops.balance.forEach((el) => {
       labels.push(el.friendname)
       balance.push(el.balance)
       borrowed.push(el.borrowed * (-1))
       lent.push(el.lent)
     })
     const chartData = Object.assign({}, this.state.chartData)
     chartData.labels = labels;
     chartData.datasets[0].data = balance;
     chartData.datasets[1].data = borrowed;
     chartData.datasets[2].data = lent;

     console.log(chartData)
     this.setState({
       chartData: chartData
     })


    //  this.props.balance.forEach((each) => {
    //    labels.push(each.friendname)
    //    balance.push(each.balance)
    //  })
    //  const datasets = [...this.state.chartData.datasets]
    //  datasets[0].data = balance
    //  const chartData = Object.assign({}, this.state.chartData, {
    //    labels : labels,
    //    datasets: datasets
    //  })
    //    this.setState({
    //      chartData: labels,
     //
    //  })

 }

  render(){
    const  {balance,getBalanceByEvent, user, settleList, friendList } = this.props
    console.log(this.props)

    return(
      <div className="Balance-wrapper">

        <div className = "chart">
          <Bar
          	data={this.state.chartData}
          	width={30}
          	height={300}
          	options={{
          		maintainAspectRatio: false,
              layout: {
                padding: {
                  left: 30,
                  right: 30,
                  bottom: 10,
                  top: 10
                }
              }
          	}}
          />
          </div>

          <div className="button-div">
            <Payment />
          </div>
      </div>



    )
  }
}
export default connect(state => {
  return state;
},{getBalanceByEvent})(Balance)




//
// <List>
//   {balance.map((el,i) => {
//     return(
//       <ListItem
//         // leftAvatar={<Avatar src={} />}
//         // rightIconButton={rightIconMenu}
//         initiallyOpen={false}
//         key={i}
//         primaryText={el.friendname}
//         secondaryText={el.balance} />
//     )})}
//   </List>
