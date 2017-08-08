const initialState = {
    eventInputValue: '',
    amountInputValue: '',
    amount: 0,
    events: [Moab, Vegas],
    friends: [George, Im, Willis],
    
}

const EVENTINPUT='EVENTINPUT'
     ,AMOUNTINPUT='AMOUNTINPUT'
     ,SAVEEVENT='SAVEEVENT'
     ,DELETEEVENT='DELETEEVENT';

export default function (state=initialState, action){
    switch (action.type) {
        case EVENTINPUT:
            console.log('handled Input')
            return Object.assign({}, state, {
                eventInputValue: action.payload
        })
        // case AMOUNTINPUT:
        //     return Object.assign({}, state, {
        //         value: action.payload
        //     })
        default:
            return state
    }
}

export function eventInput(e){
    console.log(e.target.value)
    return {
        type: EVENTINPUT,
        payload: e.target.value
    }
}