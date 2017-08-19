import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
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
              'rgba(147, 250, 209, 0.7)',
              'rgba(147, 250, 209, 0.7)',
              'rgba(147, 250, 209, 0.7)',
              'rgba(147, 250, 209, 0.7)',
              'rgba(147, 250, 209, 0.7)',
              'rgba(147, 250, 209, 0.7)',
              'rgba(147, 250, 209, 0.7)',
              'rgba(147, 250, 209, 0.7)',
              'rgba(147, 250, 209, 0.7)',
              'rgba(147, 250, 209, 0.7)',
              'rgba(147, 250, 209, 0.7)'
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
     nextprops.balance.forEach((el) => {
       labels.push(el.friendname)
       balance.push(el.balance)
     })
     const chartData = Object.assign({}, this.state.chartData)
     chartData.labels = labels;
     chartData.datasets[0].data = balance
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
    const  {balance,getBalanceByEvent, user } = this.props
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
          <RaisedButton label="Full width" fullWidth={true} />
          <Payment balance={balance} user={user}/>
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
