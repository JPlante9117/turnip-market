import { SET_DATAKEY } from "../actions/userActions"

const initialState = {
    dataKey: '',
    username: '',
    avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
    islandName: ''
}

export default (state = initialState, action) => {
    switch(action.type){
        case SET_DATAKEY:
            return {
                ...state,
                dataKey: action.key
            }
        default:
            return state
    }
}