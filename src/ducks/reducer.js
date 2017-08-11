import axios from 'axios'
const initialState = {
    user: {},
    responseData: []
}

const GETUSER = 'GETUSER',
      GETEVENTS = 'GETEVENTS',
      ADDEVENT= 'ADDEVENT'

export default function (state=initialState, action){
    switch (action.type) {
        case GETUSER + '_FULFILLED':
            return Object.assign({},state, {
              user: action.payload
            });
        case GETEVENTS + '_FULFILLED':
            return Object.assign({},state,{
              responseData: action.payload
            });
          case ADDEVENT + '_FULFILLED':
          return Object.assign({},state,{
            eventName: action.payload
          })
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
export function getEvents(){
  let promise = axios.get('/api/main/getEvent').then(res => res.data)
  console.log(promise)
    return {
      type: GETEVENTS,
      payload: promise
    }
}
