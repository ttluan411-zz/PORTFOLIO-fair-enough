import axios from 'axios'
const initialState = {
    user: {},
    responseData: [],
    friendlist: [],
}

const GETUSER = 'GETUSER',
      GETEVENTS = 'GETEVENTS',
      SELECTEVENT = 'SELECTEVENT'

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
            })
        default:
            return state
    }
}

export function getUser(){
  let promise = axios.get('/api/main').then(res => res.data)
  return {
    type: GETUSER,
    payload: promise
  }
}
export function getEvents(){
  let promise = axios.get(`/api/main/getEvent`).then(res => res.data)
    return {
      type: GETEVENTS,
      payload: promise
    }
}
export function selectEvent(i){
  let promise = axios.get(`/api/main/getEvent/${i}`).then(res => res.data)
  return {
    type: SELECTEVENT,
    payload: promise
  }
}
export function getFriendList(){
  let promise = axios.get()
}
