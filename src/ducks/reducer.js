import axios from 'axios'
const initialState = {
    user: {},
    responseData: [],
    friendList: [],
    bills: [],
    billList: [],
    eventSelected: null
}

const GETUSER = 'GETUSER',
      GETEVENTS = 'GETEVENTS',
      SELECTEVENT = 'SELECTEVENT',
      GETFRIENDS = 'GETFRIENDS',
      GETBILLS = 'GETBILLS',
      GETTRANSACTION = 'GETTRANSACTION'

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
        case SELECTEVENT + '_FULFILLED':
            return Object.assign({},state,{
              responseData: action.payload
            });
        case GETFRIENDS + '_FULFILLED':
            return Object.assign({},state,{
              friendList: action.payload
            });
        case GETBILLS + '_FULFILLED':
            return Object.assign({},state,{
              billList: action.payload.data
            });
        case GETTRANSACTION + '_FULFILLED':
            return Object.assign({}, state,{
              transactionList: action.payload
            })

        default:
            return state
    }
}
// GET LOGGED IN USER
export function getUser(){
  let promise = axios.get('/api/main').then(res => res.data)
  return {
    type: GETUSER,
    payload: promise
  }
}
//GET EVENT LIST
export function getEvents(){
  let promise = axios.get(`/api/main/getEvent`).then(res => res.data)
    return {
      type: GETEVENTS,
      payload: promise
    }
}
// GET SINGLE EVENT FOR SELECTED EVENT
export function selectEvent(i){
  let promise = axios.get(`/api/main/getEvent/${i}`).then(res => res.data)
  return {
    type: SELECTEVENT,
    payload: promise
  }
}
// GET ALL USERS
export function getFriends(){
  let promise = axios.get(`/api/main/getFriends`).then(res => res.data)
  return {
    type: GETFRIENDS,
    payload: promise
  }
}
//GET BILL LIST THAT MATCH EVENT
export function getBills(i){
  let promise = axios.get(`/api/main/getBills/${i}`)
  return {
    type: GETBILLS,
    payload: promise
  }
}
