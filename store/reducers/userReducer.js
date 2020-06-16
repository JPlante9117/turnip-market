import { SET_DATAKEY, SET_USERDATA, GET_USERDATA, GET_USERS } from "../actions/userActions"

const initialState = {
    users: [],
    dataKey: '',
    username: '',
    avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
    islandName: ''
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case SET_DATAKEY:
            return {
                ...state,
                dataKey: action.key,
                username: action.data.username,
                avatar: action.data.avatar,
                islandName: action.data.islandName
            }
        case SET_USERDATA:
            return{
                ...state,
                username: action.username,
                avatar: action.avatarURL,
                islandName: action.islandName
            }
        case GET_USERDATA:
            return{
                username
            }
        default:
            return state
    }
}