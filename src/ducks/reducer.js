const initialState = {
    value: '',
    event: [],
    friends: [],
    
}

const HANDLEINPUTCHANGE = 'HANDLEINPUTCHANGE';

export default function (state=initialState, action){
    switch (action.type) {
        case HANDLEINPUTCHANGE:
            console.log('handled Input')
            return Object.assign({}, state, {
                value: action.payload
        })
        default:
            return state
    }
}

export function handleInputChange(e){
    console.log(e.target.value)
    return {
        type: HANDLEINPUTCHANGE,
        payload: e.target.value
    }
}