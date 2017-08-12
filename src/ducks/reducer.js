import axios from 'axios'
const initialState = {
    user: {},
    responseData: [],
    friendList: [],
    bills: []
}

const GETUSER = 'GETUSER',
      GETEVENTS = 'GETEVENTS',
      SELECTEVENT = 'SELECTEVENT',
      GETFRIENDS = 'GETFRIENDS'

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
