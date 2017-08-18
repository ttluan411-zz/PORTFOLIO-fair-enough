import axios from 'axios'
const initialState = {
    user: {},
    responseData: [],
    bills: [],
    billList: [],
    friendList: [],
    eventSelected: null,
    balance:{},
    userEmails:[],
    friendGroup:[]
}

const GET_USER = 'GET_USER',
      GET_EVENTS = 'GET_EVENTS',
      SELECT_EVENT = 'SELECT_EVENT',
      GET_FRIENDS = 'GET_FRIENDS',
      GET_BILLS = 'GET_BILLS',
      GET_TRANSACTION = 'GET_TRANSACTION',
      GET_EMAILS = 'GET_EMAILS',
      GET_BALANCE_BY_EVENT = 'GET_BALANCE_BY_EVENT',
      SEARCH_USER = 'SEARCH_USER'


export default function (state=initialState, action){
    switch (action.type) {
        case GET_USER + '_FULFILLED':
            return Object.assign({},state, {
              user: action.payload.data
            });
        case GET_EVENTS + '_FULFILLED':
            return Object.assign({},state,{
              responseData: action.payload.data
            });
        case SELECT_EVENT + '_FULFILLED':
            return Object.assign({},state,{
              responseData: action.payload.data,
              eventSelected: action.payload.data
            });
        case GET_FRIENDS + '_FULFILLED':
            return Object.assign({},state,{
              friendList: action.payload.data
            });
        case GET_EMAILS + '_FULFILLED':
            return Object.assign({},state,{
              userEmails: [].concat.apply([], action.payload.data.map(Object.values))
            });
        case GET_BILLS + '_FULFILLED':
        console.log('it hit this point',action.payload.data)

            return Object.assign({},state,{
              billList: action.payload.data
            });
        case GET_TRANSACTION + '_FULFILLED':
            return Object.assign({}, state,{
              transactionList: action.payload.data
            });
        case GET_BALANCE_BY_EVENT + '_FULFILLED':
            return Object.assign({}, state,{
              balance: action.payload.data
            });
        case SEARCH_USER + '_FULFILLED':
        console.log(action.payload.data)
            return Object.assign({}, state,{
              friendGroup: [...state.friendGroup,action.payload.data[0]]
            })
        default:
            return state
    }
}
// GET LOGGED IN USER
export function getUser(){
  let promise = axios.get('/api/main')
  return {
    type: GET_USER,
    payload: promise
  }
}
//GET EVENT LIST
export function getEvents(){
  let promise = axios.get(`/api/main/getEvent`)
    return {
      type: GET_EVENTS,
      payload: promise
    }
}
// GET SINGLE EVENT FOR SELECTED EVENT
export function selectEvent(i){
  let promise = axios.get(`/api/main/getEvent/${i}`)
  return {
    type: SELECT_EVENT,
    payload: promise
  }
}
// GET ALL USERS
export function getFriends(){
  let promise = axios.get(`/api/main/getFriends`)
  return {
    type: GET_FRIENDS,
    payload: promise
  }
}
//GET ALL USER EMAILS
export function getUserEmails(){
  let promise = axios.get(`/api/main/getEmails`)
  return {
    type: GET_EMAILS,
    payload: promise
  }
}
//GET USER BY EMAIL
export function searchUserByEmail(email, eventid){
  let promise = axios.get(`/api/main/searchUser/${email}/${eventid}`)
  return {
    type: SEARCH_USER,
    payload: promise
  }
}
//GET BILL LIST THAT MATCH EVENT
export function getBills(i){
  let promise = axios.get(`/api/main/getBills/${i}`)
  return {
    type: GET_BILLS,
    payload: promise
  }
}

//GET BALANCE
// export function getAmountEachUserOwe(i){
//   let promise = axios.get(`/api/main/getAmountEachUserOwe/${i}`)
//   return {
//     type: GET_AMOUNT_EACH_USER_OWE,
//     payload: promise
//   }
// }
export function getBalanceByEvent(i){
  console.log(i)
  let promise = axios.post(`/api/main/getBalanceByEvent`,i)
  return {
    type: GET_BALANCE_BY_EVENT,
    payload: promise
  }
}
