import axios from 'axios'
const initialState = {
    eventInputValue: '',
    amountInputValue: '',
    amount: 0,
    events: ['Moab', 'Vegas'],
    friends: ['George', 'Im', 'Willis'],
    user: {}
}

const EVENTINPUT='EVENTINPUT'
     ,AMOUNTINPUT='AMOUNTINPUT'
     ,SAVEEVENT='SAVEEVENT'
     ,DELETEEVENT='DELETEEVENT'
     ,GETUSER='GETUSER'

export default function (state=initialState, action){
    switch (action.type) {
        case EVENTINPUT:
            return Object.assign({}, state, {
                eventInputValue: action.payload
        })
        case GETUSER + '_FULFILLED':
          return Object.assign({},state, {
            user: action.payload
          })
        // case AMOUNTINPUT:
        //     return Object.assign({}, state, {
        //         value: action.payload
        //     })
        default:
            return state
    }
}

export function getUser(){
  let promise = axios.get('/api/main').then(res => res.data)
  console.log(promise)
  return {
    type: GETUSER,
    payload: promise
  }
}

export function eventInput(e){
    console.log(e.target.value)
    return {
        type: EVENTINPUT,
        payload: e.target.value
    }
}
